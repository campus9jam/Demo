'use server';

import { z } from 'zod';
import { collection, addDoc, doc, updateDoc, increment, getDocs, query, where } from 'firebase/firestore';
import { getFirebase } from '@/firebase/config';
import { generateProductImage as generateProductImageFlow } from '@/ai/flows/generate-product-image';
import { uploadDataURLAndGetURL } from '@/services/storage.ts';

const priceSchema = z.object({
  product: z.string().min(1, 'Product name is required'),
  cost: z.coerce.number().positive('Cost price must be positive'),
  rate: z.coerce.number().positive('Sale price must be positive'),
  category: z.string().optional(),
  stockToAdd: z.coerce.number().min(0, 'Initial stock cannot be negative').optional(),
  barcode: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export async function submitPrice(prevState: any, formData: FormData) {
  const validatedFields = priceSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { firestore } = getFirebase();
  let { product, cost, rate, category, stockToAdd, barcode, imageUrl } = validatedFields.data;

  try {
    const productsRef = collection(firestore, 'products');
    const q = query(productsRef, where("name", "==", product));
    const querySnapshot = await getDocs(q);

    let productId: string;

    if (querySnapshot.empty) {
      // New product, get image if not provided
      if (!imageUrl) {
        console.log("No image URL provided, generating one with AI...");
        const genImageResponse = await generateProductImageFlow({ productName: product });
        // The AI returns a data URL, we need to upload it to storage
        const aiImageUrl = await uploadDataURLAndGetURL(
            genImageResponse.imageUrl,
            `products/${product.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`
        );
        imageUrl = aiImageUrl;
        console.log("AI Generated and uploaded image URL:", imageUrl);
      }

      const newProductRef = await addDoc(productsRef, {
        name: product,
        price: rate,
        cost: cost,
        stock: stockToAdd || 0,
        category: category || 'Uncategorized',
        barcode: barcode || '',
        imageUrl: imageUrl || '',
      });
      productId = newProductRef.id;
    } else {
      // Existing product, update it
      const productDoc = querySnapshot.docs[0];
      productId = productDoc.id;

      const existingData = productDoc.data();
      let finalImageUrl = imageUrl || existingData.imageUrl;

      // Generate image only if no URL is provided now AND none exists already
      if (!finalImageUrl) {
        console.log("No image URL, generating one with AI for existing product...");
        const genImageResponse = await generateProductImageFlow({ productName: product });
        const aiImageUrl = await uploadDataURLAndGetURL(
            genImageResponse.imageUrl,
            `products/${productId}.png`
        );
        finalImageUrl = aiImageUrl;
         console.log("AI Generated and uploaded image URL:", finalImageUrl);
      }

      await updateDoc(doc(firestore, 'products', productId), {
        price: rate,
        cost: cost,
        ...(stockToAdd !== undefined && { stock: increment(stockToAdd) }),
        ...(category && { category }),
        ...(barcode && { barcode }),
        imageUrl: finalImageUrl,
      });
    }

    return {
      message: `Product '${product}' saved successfully.`,
      errors: {},
      data: { ...validatedFields.data, productId },
    };

  } catch (error) {
    console.error("Error submitting price:", error);
    return {
      message: 'Error: Could not save product.',
      errors: {},
    };
  }
}
