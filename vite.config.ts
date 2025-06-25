import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { configDefaults } from "vitest/config";


export default defineConfig({
  plugins: [dts({
    rollupTypes: true,
    tsconfigPath: "./tsconfig.app.json",
  })],
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
  build: {
    target: 'es2020',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ColumnResizerLib',
      fileName: (format) => `column-resizer-lib.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [...configDefaults.exclude, 'dist'],
  }
});