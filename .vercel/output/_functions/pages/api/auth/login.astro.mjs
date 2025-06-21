import { g as getUserByEmail, v as verifyPassword } from '../../../chunks/db_vWCwHg5I.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
  }
  const user = await getUserByEmail(email);
  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }
  const isValidPassword = await verifyPassword(password, user.passwordHash);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }
  cookies.set("session_id", user.id, {
    // Usar user.id o un token de sesión real
    path: "/",
    httpOnly: true,
    secure: true,
    // Solo HTTPS en producción
    maxAge: 60 * 60 * 24 * 7
    // 1 semana
  });
  return new Response(JSON.stringify({ message: "Login successful", userId: user.id }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
