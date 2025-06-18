
import { stoneApp } from '@stone-js/core'
import * as rawModules from './modules.mjs'

/**
 * Middleware to print the URLs of the server.
 */
const PrintUrlsMiddleware = (context, next) => {
  context.blueprint.setIf('stone.adapter.printUrls', true)
  return next(context)
}

/**
 * Build and run the Stone app.
 */
export const stone = await stoneApp({
  modules: Object.values(rawModules),
})
.configure((blueprint) => {
  blueprint.add('stone.blueprint.middleware', [{ module: PrintUrlsMiddleware }])
})
.run()
