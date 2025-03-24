import { IncomingHttpEvent } from "@stone-js/http-core"
import { UserNotFoundError } from "../errors/UserNotFoundError"
import { FactoryErrorHandler, FunctionalErrorHandler, ILogger } from "@stone-js/core"

/**
 * User Error Handler Options
 */
export interface UserErrorHandlerOptions {
  logger: ILogger
}

/**
 * User Error Handler
 */
export const userNotFoundErrorHandler: FactoryErrorHandler<IncomingHttpEvent> = (
  { logger }: UserErrorHandlerOptions
): FunctionalErrorHandler<IncomingHttpEvent> => (error: UserNotFoundError, _event: IncomingHttpEvent) => {
  logger.error(error.message)

  return {
    statusCode: 404,
    content: {
      errors: [{ message: error.message }]
    }
  }
}