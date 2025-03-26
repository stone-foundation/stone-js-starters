import { ReactNode } from "react"
import { Browser } from "@stone-js/browser-adapter"
import { ILogger, LogLevel, StoneApp } from "@stone-js/core"
import { IComponentEventHandler, ReactIncomingEvent, RenderContext, UseReact } from "@stone-js/use-react"

/**
 * Application
 * 
 * This is the main application entry point.
 * 
 * @UseReact() is used to enable the React.
 * @Browser() is used to enable the Browser adapter.
 * @StoneApp() is used to enable the Stone application, it is required.
 */
@Browser()
@UseReact()
@StoneApp({ logger: { level: LogLevel.INFO } })
export class Application implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Logger is a service for logging.
  */
  private readonly logger: ILogger

  /**
   * Create a new instance of Application
   * At this point, all the dependencies are resolved and injected.
   * You can access the container and all the services.
   * 
   * @param logger - Logger service.
  */
  constructor ({ logger }: { logger: ILogger }) {
    this.logger = logger
  }

  /**
   * Handle incoming events
   * 
   * @param event Incoming event
   * @returns response
  */
  handle(event: ReactIncomingEvent): ResponseData {
    // Get the name from the event
    const message = `Hello ${event.get<string>('name', 'World')}!`

    // Log a message
    this.logger.info(message)

    // Return a JSON response
    return { message }
  }

  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render ({ data }: RenderContext<ResponseData>): ReactNode {
    return (
      <section className="container">
        <h1 className="h1 text-center mt-64">{data?.message}</h1>
      </section>
    )
  }
}

/**
 * Response data
 */
export interface ResponseData {
  message: string
}
