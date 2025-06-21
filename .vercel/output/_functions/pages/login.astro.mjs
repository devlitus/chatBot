import { c as createComponent, a as createAstro, m as maybeRenderHead, d as renderTemplate, e as renderComponent } from '../chunks/astro/server_BVxofYex.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_B-sAqjoU.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login$1;
  let error = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (email !== "test@example.com" || password !== "password") {
      error = "Invalid email or password";
    } else {
      console.log("Login successful");
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="login-container" data-astro-cid-b2fdlob7> <h2 data-astro-cid-b2fdlob7>Login</h2> ${error && renderTemplate`<p class="error" data-astro-cid-b2fdlob7>${error}</p>`} <form method="POST" action="/api/auth/login" data-astro-cid-b2fdlob7> <div data-astro-cid-b2fdlob7> <label for="email" data-astro-cid-b2fdlob7>Email:</label> <input type="email" id="email" name="email" required data-astro-cid-b2fdlob7> </div> <div data-astro-cid-b2fdlob7> <label for="password" data-astro-cid-b2fdlob7>Password:</label> <input type="password" id="password" name="password" required data-astro-cid-b2fdlob7> </div> <button type="submit" data-astro-cid-b2fdlob7>Login</button> </form> <p data-astro-cid-b2fdlob7>Don't have an account? <a href="/register" data-astro-cid-b2fdlob7>Register here</a></p> </div> `;
}, "C:/dev/chatBot/src/components/Login.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Login", $$Login$1, {})} </main> ` })}`;
}, "C:/dev/chatBot/src/pages/login.astro", void 0);

const $$file = "C:/dev/chatBot/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
