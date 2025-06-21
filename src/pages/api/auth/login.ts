// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { getUserByEmail, verifyPassword } from '../../../utils/db'; // Asumimos que estas funciones existen

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash);

  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  // Simulación de creación de sesión
  cookies.set('session_id', user.id, { // Usar user.id o un token de sesión real
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD, // Solo HTTPS en producción
    maxAge: 60 * 60 * 24 * 7 // 1 semana
  });

  // Redirigir al dashboard o a la página principal después del login
  // return redirect('/dashboard', 302); // Descomentar cuando exista /dashboard
  return new Response(JSON.stringify({ message: 'Login successful', userId: user.id }), { status: 200 });
};
