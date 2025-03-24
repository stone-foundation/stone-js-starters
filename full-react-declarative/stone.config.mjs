import { defineConfig } from '@stone-js/cli'

/**
 * Stone build configuration.
 */
export default defineConfig({
  vite: {
    build: {
      target: 'esnext',
    }
  }
})
