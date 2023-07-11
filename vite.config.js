import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [react(), reactRefresh()],
  build: {
    outDir: '../build',
    exclude: ['*.html', '*.css'],
    copyPublicDir: false,
    rollupOptions: {},
    watch: {}
  },
  server: {
    open: true,
    middleware: [require('browser-sync')()],
    watch: {
      // Add the CSS file(s) or directory to watch
      include: './CSS/**/*.css',
      include: './**/*.php',
    },
  },
});
