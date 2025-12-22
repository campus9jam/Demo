'use server';

import { z } from 'zod';
import { getFirebase } from '@/firebase/config';
import { AuthError } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signup(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Account.',
    };
  }
  const { email, password } = validatedFields.data;
  const { auth } = getFirebase();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { message: `Created user ${email}` };
  } catch (e) {
    const error = e as AuthError;
    return {
      message: error.message,
    };
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Log In.',
    };
  }

  const { email, password } = validatedFields.data;
  const { auth } = getFirebase();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { message: 'Logged in' };
  } catch (e) {
    const error = e as AuthError;
    return {
      message: error.message,
    };
  }
}
