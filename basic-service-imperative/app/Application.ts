import { NODE_HTTP_PLATFORM, nodeHttpAdapterBlueprint } from "@stone-js/node-http-adapter"
import { defineCommand, NODE_CONSOLE_PLATFORM, nodeConsoleAdapterBlueprint } from "@stone-js/node-cli-adapter"
import { defineStoneApp, defineConfig, IBlueprint, ILogger, IncomingEvent, FunctionalEventHandler } from "@stone-js/core"

/**
 * Create an handler using the factory handler.
 */
export const Application = ({ logger }: AppOptions): FunctionalEventHandler<IncomingEvent> => {
  return (event: IncomingEvent): ResponseData => {
    // Get the name from the event
    const message = `Hello ${event.get<string>('name', 'World')}!`

    // Log a message
    logger.info(message)

    // Return a JSON response
    return { message }
  }
}

/**
 * Application factory.
 *
 * @param options - The application options.
 * @returns A function that handles incoming events and returns a response.
 */
export const MyStoneApp = defineStoneApp(
  Application,
  {
    debug: true,
    isFactory: true,
    adapter: { platform: NODE_HTTP_PLATFORM }
  },
  [nodeHttpAdapterBlueprint, nodeConsoleAdapterBlueprint],
)

/**
 * Application configuration.
 */
export const AppConfig = defineConfig({
  afterConfigure (blueprint: IBlueprint) {
    if (blueprint.is('stone.adapter.platform', NODE_CONSOLE_PLATFORM)) {
      blueprint.set(defineCommand(Application, { name: '*', isFactory: true }))
    }
  }
})

/**
 * Application options.
 */
interface AppOptions {
  logger: ILogger
}

/**
 * Response data
 */
export interface ResponseData {
  message: string
}
