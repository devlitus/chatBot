import { c as createComponent, a as createAstro, m as maybeRenderHead, d as renderTemplate, e as renderComponent, f as renderScript } from '../chunks/astro/server_CXhY5Dnf.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_KQbayxwH.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="p-4 flex justify-between items-center"> <h1 class="text-xl font-bold">Astro ChatBot</h1> <nav> <a href="/login" class="text-blue-500 hover:text-blue-700 px-3 py-2">Login</a> <a href="/register" class="text-blue-500 hover:text-blue-700 px-3 py-2">Register</a> </nav> </header>`;
}, "C:/dev/chatBot/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="p-4"> <div class="flex items-center"> <textarea id="message-input" placeholder="Escribe tu mensaje..." class="w-full h-fit p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 field-sizing-content resize-none"></textarea> <button id="send-button" class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
Enviar
</button> </div> </footer>`;
}, "C:/dev/chatBot/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Astro ChatBot", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-center h-screen bg-gray-900 text-white" data-astro-cid-j7pv25f6> <div class="w-full max-w-[1200px] flex flex-col h-full" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} <!-- Messages --> <main id="messages-container" class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar" data-astro-cid-j7pv25f6> <!-- Messages will be loaded here from IndexedDB --> </main> <!-- Loading Indicator --> <div id="loading-indicator" class="hidden flex flex-col justify-center items-center p-4" role="status" aria-live="polite" data-astro-cid-j7pv25f6> <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" data-astro-cid-j7pv25f6></div> </div> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} </div> </div> ` })}  ${renderScript($$result, "C:/dev/chatBot/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/chatBot/src/pages/index.astro", void 0);

const $$file = "C:/dev/chatBot/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
