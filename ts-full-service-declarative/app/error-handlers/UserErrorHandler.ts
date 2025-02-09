import { UserNotFoundError } from "../errors/UserNotFoundError"
import { ErrorHandler, IErrorHandler, ILogger, Promiseable } from "@stone-js/core"
import { HTTP_NOT_FOUND, IncomingHttpEvent, JsonHttpResponse } from "@stone-js/http-core"

/**
 * User Error Handler Options
 */
export interface UserErrorHandlerOptions {
  logger: ILogger
}

/**
 * User Error Handler
 */
@ErrorHandler({ error: ['RouteNotFoundError', 'UserNotFoundError'] })
export class UserErrorHandler implements IErrorHandler<IncomingHttpEvent> {
  private readonly logger: ILogger

  /**
   * Create a new instance of UserErrorHandler
   * 
   * @param logger
   */
  constructor({ logger }: UserErrorHandlerOptions) {
    this.logger = logger
  }

  /**
   * Handle the UserNotFoundError
   * 
   * @param error - The error to handle
   * @param _event - The incoming event
   * @returns The response
   */
  @JsonHttpResponse(HTTP_NOT_FOUND)
  handle(error: UserNotFoundError, _event: IncomingHttpEvent): Promiseable<unknown> {
    this.logger.error(error.message)

    return {
      errors: [{ message: error.message }]
    }
  }
}
