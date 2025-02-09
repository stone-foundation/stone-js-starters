import { stoneApp } from '@stone-js/core'

/**
 * Import application modules.
 */
const rawModules = import.meta.glob('../app/**/*.{ts,tsx}', { eager: true })
const modules = Object.values(rawModules).flatMap((module: any) => Object.values(module)[0])

/**
 * Build and run the Stone app.
 */
export const stone = await stoneApp({ modules }).run()