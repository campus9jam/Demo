'use server';

import { z } from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';

const inventorySchema = z.object({
  product: z.string().min(1, 'Product ID is required'),
  quantity: z.coerce.number().min(0, 'Quantity cannot be negative'),
});

export async function submitInventory(prevState: any, formData: FormData) {
    const validatedFields = inventorySchema.safeParse({
        product: formData.get('product'),
        quantity: formData.get('quantity')
    });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();
  const { product: productId, quantity } = validatedFields.data;

  try {
    const productRef = doc(firestore, 'products', productId);
    await updateDoc(productRef, {
      stock: quantity
    });

    return {
      message: `Stock for product updated to ${quantity}.`,
      errors: {},
      data: validatedFields.data,
    };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return {
        message: 'Error: Could not update stock.',
        errors: {},
    };
  }
}
