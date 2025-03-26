import { ReactNode } from "react"
import { browserAdapterBlueprint } from "@stone-js/browser-adapter"
import { defineAppBlueprint, defineEventHandler, ILogger, stoneBlueprint } from "@stone-js/core"
import { RenderContext, ReactIncomingEvent, useReactBlueprint, UseReactEventHandler, defineFactoryComponentEventHandler } from "@stone-js/use-react"

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
    render ({ data }: RenderContext<ResponseData>): ReactNode {
      return (
        <section className="container">
          <h1 className="h1 text-center mt-64">{data?.message}</h1>
        </section>
      )
    }
  }
}

/**
 * Application blueprint.
 */
export const AppBlueprint = defineAppBlueprint(stoneBlueprint, browserAdapterBlueprint, useReactBlueprint, {
  stone: {
    debug: true,
    kernel: {
      eventHandler: defineEventHandler(UseReactEventHandler, { isClass: true })
    },
    useReact: {
      componentEventHandler: defineFactoryComponentEventHandler(Application)
    }
  }
})
