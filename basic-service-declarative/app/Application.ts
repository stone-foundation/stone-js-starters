export { stoneApp } from "@stone-js/core";
import { NodeHttp } from "@stone-js/node-http-adapter"
import { IncomingHttpEvent } from "@stone-js/http-core"
import { IApplicationHandler, ILogger, LogLevel, StoneApp } from "@stone-js/core"

/**
 * Application options.
 */
interface AppOptions {
  logger: ILogger
}

/**
 * Application
 * 
 * This is the main application entry point.
 * 
 * @StoneApp() is used to enable the Stone application, it is mandatory.
 * @NodeHttp() is used to enable the Node HTTP adapter.
 * 
 * You have access to the Stone's application lifecycle hooks.
 */
@NodeHttp()
@StoneApp({ logger: { level: LogLevel.INFO } })
export class Application implements IApplicationHandler<IncomingHttpEvent> {
  /**
   * Logger is a service for logging.
  */
  private readonly logger: ILogger

  /**
   * Create a new instance of Application
   * At this point, all the dependencies are resolved and injected.
   * You can access the container and all the services.
   * 
   * @param logger - Logger service
  */
  constructor ({ logger }: AppOptions) {
    this.logger = logger
  }

  /**
   * Handle incoming HTTP events
   * 
   * @param event Incoming HTTP event
   * @returns Outgoing HTTP response
  */
  handle(event: IncomingHttpEvent): { message: string } {
    // Get the name from the event
    const message = `Hello ${event.get<string>('name', 'World')}`

    // Log a message
    this.logger.info(message)

    // Return a JSON response
    return { message }
  }
}