import { g as getUserByEmail, h as hashPassword, c as createUser } from '../../../chunks/db_vWCwHg5I.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();
  if (!email || !password || !confirmPassword) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }
  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
  }
  const passwordHash = await hashPassword(password);
  try {
    const newUser = await createUser(email, passwordHash);
    return new Response(JSON.stringify({ message: "User registered successfully", userId: newUser.id }), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
