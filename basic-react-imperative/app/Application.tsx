import { JSX } from "react"
import { browserAdapterBlueprint } from "@stone-js/browser-adapter"
import { defineConfig, IBlueprint, ILogger, isNotEmpty } from "@stone-js/core"
import { defineStoneReactApp, IPage, PageRenderContext, ReactIncomingEvent } from "@stone-js/use-react"
import { defineCommand, FactoryCommandHandler, NODE_CONSOLE_PLATFORM, nodeConsoleAdapterBlueprint } from "@stone-js/node-cli-adapter"

/**
 * Create an handler using the factory handler.
 */
export const Application = ({ logger }: AppOptions): IPage<ReactIncomingEvent> => {
  return {
    handle (event: ReactIncomingEvent): ResponseData {
      // Get the name from the event
      const message = `Hello ${event.get<string>('name', 'World')}!`
  
      // Log a message
      logger.info(message)
  
      // Return a JSON response
      return { message }
    },

    /**
     * Render the component.
     * 
     * @returns The rendered component.
     */
    render ({ data }: PageRenderContext<ResponseData>): JSX.Element {
      return (
        <section className="container">
          <h1 className="h1 text-center mt-64">{data?.message}</h1>
        </section>
      )
    }
  }
}

/**
 * Stone-React application.
 */
export const MyStoneReactApp = defineStoneReactApp(
  Application,
  { debug: true, isFactory: true },
  [browserAdapterBlueprint, nodeConsoleAdapterBlueprint],
)

/**
 * Application configuration.
 */
export const MyAppConfig = defineConfig({
  afterConfigure (blueprint: IBlueprint) {
    if (
      isNotEmpty<FactoryCommandHandler>(Application) &&
      blueprint.is('stone.adapter.platform', NODE_CONSOLE_PLATFORM)
    ) {
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
interface ResponseData {
  message: string
}