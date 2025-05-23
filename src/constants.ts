export const GROQ_URL_MODELS: string = 'https://api.groq.com/openai/v1/models';
export const GROQ_URL_COMPLETION: string = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_API_KEY: string = import.meta.env.VITE_GROQ_API_KEY;

export const SUPABASE_ACCESS_TOKEN = import.meta.env.VITE_SUPABASE_ACCESS_TOKEN;

export const SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN;
export const SENTRY_AUTH_TOKEN: string = import.meta.env.VITE_SENTRY_AUTH_TOKEN;
export const SENTRY_ENVIRONMENT: string = import.meta.env.VITE_SENTRY_ENVIRONMENT;
