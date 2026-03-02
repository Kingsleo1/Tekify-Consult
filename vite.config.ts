import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
        host: '0.0.0.0',
        hmr: false,
      },
      plugins: [react()],
      preview: {
        port: 8080,
        host: '0.0.0.0',
        strictPort: true
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            }
          }
        }
      }
    };
});
