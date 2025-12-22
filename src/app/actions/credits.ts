'use server';

import { z } from 'zod';
import { collection, addDoc, doc, updateDoc, increment, getDocs, query, where, DocumentReference } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const creditSchema = z.object({
  customer: z.string().min(1, 'Customer name is required'),
  phone: z.string().optional(),
  creditLimit: z.coerce.number().min(0, 'Credit limit cannot be negative'),
  outlet: z.string().min(1, 'Outlet is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  paid: z.coerce.number().min(0, 'Paid amount cannot be negative'),
  date: z.string().min(1, 'Date is required'),
  employee: z.string().optional(),
});

export async function submitCredit(prevState: any, formData: FormData) {
  const validatedFields = creditSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();
  const { customer, phone, creditLimit, amount, paid, date, outlet, employee } = validatedFields.data;
  const balance = amount - paid;

  try {
    const customersRef = collection(firestore, 'customers');
    const q = query(customersRef, where("name", "==", customer));
    const querySnapshot = await getDocs(q);

    let customerRef: DocumentReference;
    if (querySnapshot.empty) {
        // Customer doesn't exist, create it
        customerRef = await addDoc(customersRef, {
            name: customer,
            phone: phone || '',
            creditLimit: creditLimit || 0,
            creditBalance: balance,
            lastTransaction: date,
        });
    } else {
        // Customer exists, update it
        const customerDoc = querySnapshot.docs[0];
        customerRef = customerDoc.ref;
        await updateDoc(customerRef, {
            creditBalance: increment(balance),
            lastTransaction: date,
            ...(creditLimit && { creditLimit }), // Only update limit if provided
        });
    }

    // Add transaction to transactions collection
    await addDoc(collection(firestore, 'transactions'), {
      type: 'sale',
      date: date,
      items: [{ name: 'Credit Sale', price: amount, qty: 1, id: 'credit' }],
      total: amount,
      payments: [
        { method: 'cash', amount: paid },
        { method: 'credit', amount: balance }
      ],
      customer: customer,
      customerId: customerRef.id,
      employee: employee || 'Admin',
      terminalId: 'CEREBREUM-WEB',
      outlet: outlet,
    });

    return {
      message: `Credit for ${customer} recorded successfully.`,
      errors: {},
    };

  } catch (error) {
    console.error("Error submitting credit:", error);
    return {
      message: 'Error: Could not record credit transaction.',
      errors: {},
    };
  }
}

const creditPaymentSchema = z.object({
  customerId: z.string().min(1),
  payment: z.coerce.number().positive('Payment amount must be positive'),
  customerName: z.string(),
  employee: z.string().optional(),
});

export async function submitCreditPayment(prevState: any, formData: FormData) {
  const validatedFields = creditPaymentSchema.safeParse({
    customerId: formData.get('customerId'),
    payment: formData.get('payment'),
    customerName: formData.get('customerName')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the payment amount.',
    };
  }

  const { firestore } = getFirebase();
  const { customerId, payment, customerName, employee } = validatedFields.data;

  try {
    const customerRef = doc(firestore, 'customers', customerId);
    await updateDoc(customerRef, {
      creditBalance: increment(-payment),
      lastTransaction: new Date().toISOString(),
    });

    // Record the repayment transaction
    await addDoc(collection(firestore, 'transactions'), {
      type: 'repayment',
      date: new Date().toISOString(),
      items: [],
      total: payment,
      payments: [{ method: 'cash', amount: payment }],
      customer: customerName,
      customerId: customerId,
      employee: employee || 'Admin',
      terminalId: 'CEREBREUM-WEB',
    });

    return {
      message: `Payment of ${payment} for ${customerName} recorded.`,
      errors: {},
    };
  } catch (error) {
    console.error("Error submitting credit payment:", error);
    return {
      message: 'Error: Could not record payment.',
      errors: {},
    };
  }
}
