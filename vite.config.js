import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "/",
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Or the port your backend runs on locally
    },
  },
});
