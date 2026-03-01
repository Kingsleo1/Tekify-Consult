import { defineConfig } from 'vite';
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    ssr: true,
    target: 'node18',
    outDir: 'dist-server',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'server.ts'),
      formats: ['es'],
      fileName: () => 'server.js',
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        'express',
        'nodemailer',
        '@supabase/supabase-js',
        'cors',
        'vite'
      ],
    },
    minify: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    }
  }
});
