import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/music': "http://localhost:3000",
      '/user': "http://localhost:3000",
    },
     
  },
  plugins: [react(),tailwindcss(),
    inject({
      Buffer: ['buffer', 'Buffer'], // 👈 inject Buffer globally
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer', // 👈 add alias
    },
  },
   optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // 👈 required
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // 👈 polyfill for runtime
      ],
    },
  },
})
