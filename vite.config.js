import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  
  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL || "https://alba-g4jq.onrender.com/api"),
    },
    server: {
      port: 5173,
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});
