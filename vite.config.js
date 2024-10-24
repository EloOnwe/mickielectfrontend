import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    historyApiFallback: true, // This ensures all routes fall back to index.html
  },
});
