import { BlueprintBuilder, StoneFactory } from '@stone-js/core'

/**
 * Import application modules.
 */
const rawModules = import.meta.glob('../app/**/*.{ts,tsx}', { eager: true })
const modules = Object.values(rawModules).flatMap((module: any) => Object.values(module)[0])

/**
 * Build Blueprint.
 * 
 * @returns {IBlueprint}
 */
const blueprint = await BlueprintBuilder.create().build(modules)

/**
 * Run application.
 */
const response = await StoneFactory.create({ blueprint }).run()

/**
 * Export adapter specific output.
 * Useful for FAAS handler like AWS lambda handler.
 * 
 * @returns {Object}
 */
export { response }