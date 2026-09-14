import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    allowedHosts: [
      'relieved-maggot-logical.ngrok-free.app',
      'localhost:5174',
      
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PaymentWidget',
      fileName: (format) => `payment-widget.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [] // Todo se empaqueta dentro del bundle final
    }
  }
});