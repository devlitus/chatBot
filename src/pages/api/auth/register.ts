// src/pages/api/auth/register.ts
import type { APIRoute } from 'astro';
import { createUser, getUserByEmail, hashPassword } from '../../../utils/db'; // Asumimos que estas funciones existen

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirm-password')?.toString();

  if (!email || !password || !confirmPassword) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: 'Passwords do not match' }), { status: 400 });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  try {
    const newUser = await createUser(email, passwordHash);
    // Redirigir a la página de login después del registro exitoso
    // return redirect('/login', 302);
     return new Response(JSON.stringify({ message: 'User registered successfully', userId: newUser.id }), { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Failed to register user' }), { status: 500 });
  }
};
