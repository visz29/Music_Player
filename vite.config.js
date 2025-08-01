import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/music': "http://localhost:3000",
      '/user': "http://localhost:3000",
    },

  },
  plugins: [react(), tailwindcss(),
  // inject({
  //   Buffer: ['buffer', 'Buffer'], // 👈 inject Buffer globally
  // }),
  ],
  resolve: {
    alias: {
      // 'react/jsx-runtime': 'react/jsx-runtime', // avoid CJS
      // 'react': 'react',
      // 'react-dom': 'react-dom',
      buffer: 'buffer', // 👈 add alias
      // fs: false,
      // path: false,
      // crypto: false,
    },
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     define: {
  //       global: 'globalThis', // 👈 required
  //     },
  //     plugins: [
  //       NodeGlobalsPolyfillPlugin({
  //         buffer: true,
  //       }),
  //       NodeModulesPolyfillPlugin(),
  //     ],
  //   },
  // },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // 👈 polyfill for runtime
      ],
    },
    // output: {
    //   manualChunks(id) {
    //     if (id.includes('node_modules')) {
    //       if (id.includes('react')) return 'react-vendor';
    //       if (id.includes('tailwindcss')) return 'tailwind';
    //       return 'vendor';
    //     }
    //   }
    // }
  },
  // define: {
  //   'require': undefined  // <-- prevents require from being used
  // },
})
