import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: false, // Don't automatically open browser
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Single bundle for small portfolio
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Base path for deployment (change if deploying to subdirectory)
  // base: '/portfolio/',
})

