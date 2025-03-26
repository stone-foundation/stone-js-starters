import { IncomingHttpEvent } from "@stone-js/http-core"
import { nodeHttpAdapterBlueprint } from "@stone-js/node-http-adapter"
import { defineAppBlueprint, defineFactoryEventHandler, ILogger, stoneBlueprint } from "@stone-js/core"

/**
 * Application options.
 */
export interface AppOptions {
  logger: ILogger
}

/**
 * Response data
 */
export interface ResponseData {
  message: string
}

/**
 * Create an handler using the factory handler.
 */
export const Application = ({ logger }: AppOptions) => {
  return (event: IncomingHttpEvent): ResponseData => {
    // Get the name from the event
    const message = `Hello ${event.get<string>('name', 'World')}!`

    // Log a message
    logger.info(message)

    // Return a JSON response
    return { message }
  }
}

/**
 * Application blueprint.
 */
export const AppBlueprint = defineAppBlueprint<any, any>(stoneBlueprint, nodeHttpAdapterBlueprint, {
  stone: {
    debug: true,
    kernel: {
      eventHandler: defineFactoryEventHandler(Application)
    }
  }
})
