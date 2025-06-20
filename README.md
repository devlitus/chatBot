# ChatBot Project

Este proyecto es una aplicación de chatbot interactiva construida con el framework Astro. Permite a los usuarios mantener conversaciones con un asistente de inteligencia artificial desarrollado con la API Google Generative AI (específicamente, el modelo Gemini). La interfaz de usuario está diseñada con Tailwind CSS para una apariencia moderna y responsiva. El historial de la conversación se almacena localmente en el navegador del usuario utilizando IndexedDB, lo que permite que los mensajes persistan entre sesiones. El backend, implementado como un endpoint de API de Astro, gestiona la comunicación con el servicio de IA de Google.

## 🤖 Funcionalidad del Chatbot

El núcleo de este proyecto es su funcionalidad de chatbot, que opera de la siguiente manera:

1.  **Interfaz de Usuario (Frontend):**
    *   Construida con Astro y estilizada con Tailwind CSS, la interfaz presenta un área de visualización de mensajes y un campo de entrada donde el usuario puede escribir sus consultas.
    *   Los mensajes enviados por el usuario y las respuestas recibidas del bot se muestran en un formato de conversación.
    *   Utiliza JavaScript para manejar las interacciones del usuario, como el envío de mensajes (al hacer clic en un botón o presionar Enter) y el renderizado dinámico de nuevos mensajes en la pantalla.
    *   La librería `marked` se utiliza para procesar las respuestas del bot, permitiendo que el texto formateado con Markdown (si lo hubiera) se muestre correctamente como HTML.

2.  **Comunicación con la IA (Backend API):**
    *   Cuando un usuario envía un mensaje, el frontend realiza una solicitud POST al endpoint `/api/chat.ts`.
    *   Este endpoint, una función serverless de Astro, recibe el mensaje del usuario.
    *   Utiliza la SDK `@google/genai` para conectarse al servicio Google Generative AI. Específicamente, interactúa con el modelo `gemini-2.5-flash`.
    *   El mensaje del usuario se envía al modelo de IA para generar una respuesta. Se ha configurado una `temperatura` de 0.5 en la solicitud a la API de Gemini, lo que influye en la creatividad de la respuesta.
    *   La respuesta de texto generada por el modelo Gemini se devuelve al frontend.

3.  **Generación de Respuestas:**
    *   El modelo `gemini-2.5-flash` de Google es responsable de comprender la consulta del usuario y generar una respuesta coherente y contextualmente relevante.

4.  **Almacenamiento del Historial de Conversación:**
    *   El proyecto utiliza IndexedDB para almacenar el historial de la conversación.
    *   Tanto los mensajes del usuario como las respuestas del bot se guardan con una indicación de quién fue el remitente (`user` o `bot`).
    *   Al cargar la página, los mensajes almacenados se recuperan y muestran. Si no hay mensajes, se muestra un saludo inicial.

## 🚀 Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── db.ts               # (Inferido) Módulo para IndexedDB.
├── .gitignore
├── .vscode/
├── astro.config.mjs
├── package-lock.json
├── package.json
└── tsconfig.json
```

**Puntos clave:**

*   **`src/pages/index.astro`**: Interfaz principal del chat.
*   **`src/pages/api/chat.ts`**: Backend API para la comunicación con Google Generative AI.
*   **`src/components/`**: Componentes reutilizables de la UI (`Header.astro`, `Footer.astro`).
*   **`src/utils/db.ts`**: Lógica para la persistencia de mensajes en IndexedDB.

Para más detalles sobre la estructura estándar de Astro, consulta la [guía oficial sobre la estructura de proyectos](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, en una terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Compila el sitio para producción en `./dist/`    |
| `npm run preview`         | Previsualiza la compilación de producción localmente |
| `npm run astro ...`       | Ejecuta comandos CLI de Astro (`astro add`, `astro check`) |
| `npm run astro -- --help` | Obtiene ayuda sobre la CLI de Astro              |

## 👀 Want to learn more?

*   **Astro Documentation**: Check out the [official Astro documentation](https://docs.astro.build) to learn more about the framework.
*   **Google Generative AI**: Explore the [Google AI documentation](https://ai.google.dev/docs) for more information on the Gemini models and Generative AI capabilities.
*   **Tailwind CSS**: Visit the [Tailwind CSS documentation](https://tailwindcss.com/docs) for guides on using this utility-first CSS framework.
*   **Marked.js**: Learn more about how [Marked.js](https://marked.js.org/) is used to parse Markdown.
*   **Astro Discord Server**: Join the [Astro Discord server](https://astro.build/chat) to connect with the community.
