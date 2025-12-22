'use server';

import { z } from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const capitalEntrySchema = z.object({
  id: z.string().optional(),
  bankAndCash: z.array(z.object({ name: z.string().min(1, "Name is required"), amount: z.coerce.number().min(0) })).optional(),
  otherInvestments: z.coerce.number().min(0, 'Other investments cannot be negative'),
  assets: z.coerce.number().min(0, 'Assets value cannot be negative'),
  rebates: z.array(z.object({ name: z.string().min(1), amount: z.coerce.number().min(0) })).optional(),
  stockOnTransit: z.array(z.object({ name: z.string().min(1), amount: z.coerce.number().min(0) })).optional(),
});


export async function submitCapitalEntry(prevState: any, formData: FormData) {
  const parseArray = (prefix: string) => {
    return Array.from(formData.keys())
      .filter(key => key.startsWith(`${prefix}.`))
      .reduce<any[]>((acc, key) => {
        const match = key.match(new RegExp(`^${prefix}\\.(\\d+)\\.(.+)$`));
        if (!match) return acc;
        const [_, indexStr, fieldName] = match;
        const index = parseInt(indexStr, 10);
        if (isNaN(index)) return acc;
        if (!acc[index]) acc[index] = {};
        const value = formData.get(key);
        // Ensure we don't add objects that are completely empty
        if (value !== null && value !== '') {
          acc[index][fieldName] = value;
        }
        return acc;
      }, [])
      .filter(item => item && (item.name || item.amount));
  };

  const rawData = {
    id: formData.get('id') as string || 'latest', // Use a singleton ID
    otherInvestments: formData.get('otherInvestments'),
    assets: formData.get('assets'),
    bankAndCash: parseArray('bankAndCash'),
    rebates: parseArray('rebates'),
    stockOnTransit: parseArray('stockOnTransit'),
  };

  const validatedFields = capitalEntrySchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();

  try {
    const capitalRef = doc(firestore, 'capital', validatedFields.data.id as string);
    await setDoc(capitalRef, validatedFields.data, { merge: true });

    return {
      message: `Capital entries recorded successfully.`,
      errors: {},
      data: validatedFields.data,
    };
  } catch (error) {
     console.error("Error submitting capital entries:", error);
    return {
      message: 'Error: Could not save capital entries.',
      errors: {},
    };
  }
}
