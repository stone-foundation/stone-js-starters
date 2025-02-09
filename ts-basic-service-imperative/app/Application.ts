import { nodeHttpAdapterBlueprint } from "@stone-js/node-http-adapter"
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core"
import { factoryHandler, ILogger, stoneApp, stoneBlueprint } from "@stone-js/core"

/**
 * Application options.
 */
export interface AppOptions {
  logger: ILogger
}

/**
 * Create an handler using the factory handler.
 */
export const Application = ({ logger }: AppOptions) => {
  return (event: IncomingHttpEvent): { message: string } => {
    // Get the name from the event
    const message = `Hello ${event.get<string>('name', 'World')}`

    // Log a message
    logger.info(message)

    // Return a JSON response
    return { message }
  }
}

/**
 * Use the Stone builder to create, configure and run the application.
 * Export the result to be used by the serverless function.
 */
export const app = await stoneApp<IncomingHttpEvent, OutgoingHttpResponse>()
  .use(stoneBlueprint, nodeHttpAdapterBlueprint)
  .handle(factoryHandler(Application))