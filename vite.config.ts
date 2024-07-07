import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { report } from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['html']
    },
  }
})
