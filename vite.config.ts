import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ── GitHub Pages Configuration ────────────────
  // For local dev: base = '/'
  // For GitHub Pages sub-path (e.g. username.github.io/portfolio):
  //   change base to '/portfolio/' (match your repo name)
  // For custom domain or username.github.io root: keep '/'
  base: '/',

  build: {
    // Output directory for production build
    outDir: 'dist',

    // Code splitting for optimal chunk sizes
    rollupOptions: {
      output: {
        // Function form is required by this version of Rollup
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/@remix-run')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
        },
      },
    },

    // Asset inlining threshold (keep small assets as data URLs)
    assetsInlineLimit: 4096,
  },

  // ── Dev Server ────────────────────────────────
  server: {
    port: 5173,
    open: false,
  },
})
