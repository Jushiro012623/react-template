import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'process.env': import.meta.env
  },
  server: {
    port: 5174
  },
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
