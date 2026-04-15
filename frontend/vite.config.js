import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ← NAYI LINE (Tailwind import)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← NAYI LINE (Tailwind plugin add kiya)
  ],
});
