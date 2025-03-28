import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // адрес бэкенда
        changeOrigin: true,
        secure: false, // Для локального HTTPS отключить проверку сертификата
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          i18n: ["i18next", "react-i18next"],
          mui: ["@mui/material"],
          react: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
