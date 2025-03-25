# ChatBot con GROQ API

Una aplicación de chat interactiva que utiliza la API de GROQ para generar respuestas inteligentes. Construida con React, TypeScript y Vite.

## Características

- 💬 Chat en tiempo real con modelos de lenguaje GROQ
- 🎨 Interfaz moderna y responsive con Tailwind CSS
- 📝 Soporte para markdown en los mensajes
- 💾 Persistencia de chats en localStorage
- 🔄 Gestión de estado con Zustand
- 🌐 Integración con la API de GROQ
- 🎯 Tipado fuerte con TypeScript

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Una API key de GROQ

## Configuración del Proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/devlitus/chatBot.git
cd chatBot
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_GROQ_API_KEY=tu_api_key_aquí
VITE_GROQ_URL_MODELS=https://api.groq.com/openai/v1/models
VITE_GROQ_URL_COMPLETION=https://api.groq.com/openai/v1/chat/completions
```

## Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/        # Componentes React
│   ├── chat/         # Componentes relacionados con el chat
│   ├── footer/       # Componente de entrada de mensajes
│   ├── sidebar/      # Navegación y lista de chats
│   └── ui/           # Componentes UI reutilizables
├── hooks/            # Custom hooks
├── services/         # Servicios de API
├── stores/           # Estado global (Zustand)
└── types/            # Definiciones de tipos TypeScript
```

## Flujo de Trabajo Git

El proyecto sigue el siguiente flujo de trabajo con Git:

- `main`: Rama principal de producción
- `dev`: Rama de desarrollo
- Ramas de feature: Para nuevas características
- Ramas de fix: Para correcciones de bugs

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run lint`: Ejecuta el linter
- `npm run preview`: Vista previa de la build de producción

## Tecnologías Principales

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- GROQ API

## Contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
