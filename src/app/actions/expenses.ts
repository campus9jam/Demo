'use server';

import { z } from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const expenseSchema = z.object({
  expDate: z.string().min(1, "Date is required"),
  expOutlet: z.string().min(1, "Outlet is required"),
  expDesc: z.string().min(1, "Description is required"),
  expQty: z.coerce.number().min(1, "Quantity must be at least 1"),
  expRate: z.coerce.number().min(1, "Rate is required"),
});

export async function submitExpense(prevState: any, formData: FormData) {
  const validatedFields = expenseSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();
  const totalAmount = validatedFields.data.expQty * validatedFields.data.expRate;

  try {
    await addDoc(collection(firestore, 'expenses'), {
      date: validatedFields.data.expDate,
      outlet: validatedFields.data.expOutlet,
      desc: validatedFields.data.expDesc,
      amount: totalAmount,
      status: 'Pending',
    });
    return {
      message: `Expense request for "${validatedFields.data.expDesc}" submitted for approval.`,
      errors: {},
      data: { ...validatedFields.data, amount: totalAmount },
    };
  } catch (error) {
    console.error("Error submitting expense:", error);
    return {
      message: 'Error: Could not submit expense request.',
      errors: {},
    };
  }
}
