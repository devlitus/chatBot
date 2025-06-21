import { c as createComponent, a as createAstro, r as renderHead, b as renderSlot, d as renderTemplate } from './astro/server_BVxofYex.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "ChatBot" } = Astro2.props;
  return renderTemplate`<html lang="en" class="h-full" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="h-full" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/dev/chatBot/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
