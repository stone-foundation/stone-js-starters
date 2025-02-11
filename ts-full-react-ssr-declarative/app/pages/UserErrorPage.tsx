import { ILogger } from "@stone-js/core";
import { RouteNotFoundError } from "@stone-js/router";
import { ErrorPage, IComponentErrorHandler, ReactIncomingEvent, RenderErrorContext } from "@stone-js/use-react";

/**
 * User Error Page component.
 */
@ErrorPage({ error: 'RouteNotFoundError' })
export class UserErrorPage implements IComponentErrorHandler<ReactIncomingEvent> {
  private readonly logger: ILogger

  /**
   * Create an UserErrorPage.
   *
   * @param logger - The logger.
   */
  constructor ({ logger }: { logger: ILogger }) {
    this.logger = logger
  }

  /**
   * Handle the error.
   * 
   * @param error - The error to handle.
   * @param event - The incoming event.
   * @returns The response.
   */
  handle (error: RouteNotFoundError, event: ReactIncomingEvent) {
    this.logger.error(error.message, { error })

    return {
      content: {
        message: `No user found with name: ${event.get<string>('name')}`
      },
      statusCode: 404
    }
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ data, statusCode }: RenderErrorContext<RouteNotFoundError>) {
    return (
      <>
        <h1>An error has occured</h1>
        <p>Handler message: {data?.message}</p>
        <p>Status Code: {statusCode}</p>
      </>
    )
  }
}
