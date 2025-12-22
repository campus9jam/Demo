'use server';

import { z } from 'zod';
import { collection, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const saleItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  productName: z.string(),
  qty: z.coerce.number().positive('Qty > 0'),
  rate: z.coerce.number().positive('Rate > 0'),
  bank: z.coerce.number().min(0).optional(),
  cash: z.coerce.number().min(0).optional(),
});

const salesSchema = z.object({
  saleDate: z.string().min(1, 'Date is required'),
  saleOutlet: z.string().min(1, 'Outlet is required'),
  sales: z.array(saleItemSchema).min(1, 'At least one sale item is required'),
  customer: z.string().optional(),
  employee: z.string().optional(),
});

export async function submitSale(prevState: any, formData: FormData) {
  const parsedSales = JSON.parse(formData.get('sales') as string);
  const validatedFields = salesSchema.safeParse({
    saleDate: formData.get('saleDate'),
    saleOutlet: formData.get('saleOutlet'),
    sales: parsedSales,
  });

  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();
  const { saleDate, saleOutlet, sales, customer, employee } = validatedFields.data;

  const totalAmount = sales.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const totalCash = sales.reduce((acc, item) => acc + (item.cash || 0), 0);
  const totalBank = sales.reduce((acc, item) => acc + (item.bank || 0), 0);


  try {
    // 1. Record the transaction
    await addDoc(collection(firestore, 'transactions'), {
      type: 'sale',
      date: saleDate,
      outlet: saleOutlet,
      items: sales.map(s => ({id: s.productId, name: s.productName, price: s.rate, qty: s.qty})),
      total: totalAmount,
      payments: [
          { method: 'cash', amount: totalCash },
          { method: 'bank', amount: totalBank },
      ],
      customer: customer || 'Walk-in',
      employee: employee || 'Admin',
      terminalId: 'CEREBREUM-WEB',
    });

    // 2. Decrement stock for each product
    const stockUpdates = sales.map(item => {
        const productRef = doc(firestore, 'products', item.productId);
        return updateDoc(productRef, {
            stock: increment(-item.qty)
        });
    });

    await Promise.all(stockUpdates);

    return {
      message: `Sale recorded successfully for a total of ${totalAmount}.`,
      errors: {},
    };

  } catch (error) {
    console.error("Error submitting sale:", error);
    return {
      message: 'Error: Could not record sale.',
      errors: {},
    };
  }
}
