
import { stoneApp } from '@stone-js/core'

/**
 * Middleware to print the URLs of the server.
 */
const PrintUrlsMiddleware = (context, next) => {
  context.blueprint.set('stone.adapter.printUrls', true)
  return next(context)
}

/**
 * Import application modules.
 */
// @ts-expect-error
const rawModules = import.meta.glob('../app/**/*.{ts,tsx,js,mjs,mjsx,jsx,json}', { eager: true })
const modules = Object
  .values(rawModules)
  .flatMap((module) => Object.values(module)[0])

/**
 * Create and run the Stone app.
 */
export const stone = await stoneApp({
  modules
})
.add('stone.builder.middleware', [{ module: PrintUrlsMiddleware }])
.run()
