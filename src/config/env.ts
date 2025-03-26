const VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!VITE_OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment.');
}

export const config = {
  openai: {
    apiKey: VITE_OPENAI_API_KEY || ''
  }
};