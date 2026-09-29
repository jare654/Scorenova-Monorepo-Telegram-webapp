import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          telegram: ['@telegram-apps/sdk-react'],
          charts: ['recharts'],
          math: ['katex'],
          ui: ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
        },
      },
    },
  },
});
