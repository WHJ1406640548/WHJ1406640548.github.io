// vite.config.js
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { VueAmazingUIResolver } from 'vue-amazing-ui'

import path from 'path';
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['> 0.5%', 'last 2 versions'], // 明确兼容目标
      // additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 补充 polyfill
    }),
    // Components({
    //   resolvers: [ // auto import components from VueAmazingUI
    //     VueAmazingUIResolver()
    //   ]
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'es2015', // 强制兼容模式
    cssTarget: 'chrome61', // 避免 CSS 变量问题
    outDir: 'docs', // 输出目录
    rollupOptions: {
      output: {
        manualChunks: undefined, // 禁用代码分割
        inlineDynamicImports: true // 内联动态导入
      }
    }
  }
})