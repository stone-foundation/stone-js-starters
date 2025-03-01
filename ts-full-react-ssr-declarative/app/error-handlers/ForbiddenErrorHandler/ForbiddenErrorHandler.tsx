import './ForbiddenErrorHandler.css'
import { ILogger } from "@stone-js/core";
import { ForbiddenError } from '../../errors/ForbiddenError';
import { ErrorHandler, IComponentErrorHandler, PageStatus, ReactIncomingEvent, RenderErrorContext } from "@stone-js/use-react";

/**
 * Forbidden Error Handler component.
 */
@ErrorHandler({
  layout: 'error',
  error: 'ForbiddenError'
})
export class ForbiddenErrorHandler implements IComponentErrorHandler<ReactIncomingEvent> {
  private readonly logger: ILogger

  /**
   * Create an ForbiddenErrorHandler.
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
   * @returns The response.
   */
  @PageStatus(403)
  handle (error: ForbiddenError) {
    this.logger.error(error.message, { error })
    return { message: "I think you're not supposed to be here! Eh ?" }
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ data, statusCode }: RenderErrorContext<ForbiddenError>) {
    return (
      <div className='text-center'>
        <h1 className='h1'>{statusCode}</h1>
        <h2 className='h4'>Are you in the right place?</h2>
        <p className='text-muted mt-24'>{data?.message}</p>
      </div>
    )
  }
}
