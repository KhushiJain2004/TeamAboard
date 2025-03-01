import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: __dirname, // Use __dirname here
    },
  }),
)
