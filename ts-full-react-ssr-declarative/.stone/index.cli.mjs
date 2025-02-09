import * as rawModules from '../dist/app.mjs'
import { stoneApp, NODE_CONSOLE_PLATFORM } from '../dist/app.mjs'

/**
 * Build and run the Stone app.
 */
export const stone = await stoneApp({
  modules: Object.values(rawModules),
})
.set('stone.adapter.platform', NODE_CONSOLE_PLATFORM)
.run()