import { c as createComponent, a as createAstro, m as maybeRenderHead, d as renderTemplate, e as renderComponent } from '../chunks/astro/server_CXhY5Dnf.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_KQbayxwH.mjs';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Register$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register$1;
  let error = "";
  let success = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    if (password !== confirmPassword) {
      error = "Passwords do not match";
    } else {
      console.log("Registration attempt:", { email, password });
      success = "Registration successful! You can now login.";
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="register-container" data-astro-cid-xfnry2t2> <h2 data-astro-cid-xfnry2t2>Register</h2> ${error && renderTemplate`<p class="error" data-astro-cid-xfnry2t2>${error}</p>`} ${success && renderTemplate`<p class="success" data-astro-cid-xfnry2t2>${success}</p>`} ${!success && renderTemplate`<form method="POST" action="/api/auth/register" data-astro-cid-xfnry2t2> <div data-astro-cid-xfnry2t2> <label for="email" data-astro-cid-xfnry2t2>Email:</label> <input type="email" id="email" name="email" required data-astro-cid-xfnry2t2> </div> <div data-astro-cid-xfnry2t2> <label for="password" data-astro-cid-xfnry2t2>Password:</label> <input type="password" id="password" name="password" required data-astro-cid-xfnry2t2> </div> <div data-astro-cid-xfnry2t2> <label for="confirm-password" data-astro-cid-xfnry2t2>Confirm Password:</label> <input type="password" id="confirm-password" name="confirm-password" required data-astro-cid-xfnry2t2> </div> <button type="submit" data-astro-cid-xfnry2t2>Register</button> </form>`} <p data-astro-cid-xfnry2t2>Already have an account? <a href="/login" data-astro-cid-xfnry2t2>Login here</a></p> </div> `;
}, "C:/dev/chatBot/src/components/Register.astro", void 0);

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Register", $$Register$1, {})} </main> ` })}`;
}, "C:/dev/chatBot/src/pages/register.astro", void 0);

const $$file = "C:/dev/chatBot/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
