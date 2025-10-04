import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/My-Portfolio-React-App/',
  resolve: {
  alias: {
    "@": "/src",
  },
},
});

