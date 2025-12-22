'use server';

import { z } from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const investmentSchema = z.object({
  name: z.string().min(1, 'Investment name is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  profit: z.coerce.number().min(0, 'Profit cannot be negative'),
  date: z.string().min(1, 'Date is required'),
});

export async function submitInvestment(prevState: any, formData: FormData) {
  const validatedFields = investmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();

  try {
    await addDoc(collection(firestore, 'investments'), validatedFields.data);
    return {
      message: `Investment in ${validatedFields.data.name} recorded successfully.`,
      errors: {},
      data: validatedFields.data,
    };
  } catch (error) {
    console.error("Error submitting investment:", error);
    return {
      message: 'Error: Could not save investment.',
      errors: {},
    };
  }
}
