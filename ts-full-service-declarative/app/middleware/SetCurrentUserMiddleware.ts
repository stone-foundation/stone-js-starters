import { UserService } from "../services/UserService";
import { IMiddleware, Middleware, NextMiddleware } from "@stone-js/core";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";

/**
 * User Handler Options
*/
export interface SetUserMiddlewareOptions {
  userService: UserService
}

/**
 * Set current user middleware
 */
@Middleware({ global: true })
export class SetCurrentUserMiddleware implements IMiddleware<IncomingHttpEvent, OutgoingHttpResponse> {
  private readonly userService: UserService

  /**
   * Create a new instance of SetCurrentUserMiddleware
   * 
   * @param userService
   */
  constructor({ userService }: SetUserMiddlewareOptions) {
    this.userService = userService
  }

  /**
   * Handle the incoming event
   * 
   * @param event - The incoming event
   * @param next - The next middleware
   * @returns The response
   */
  async handle(event: IncomingHttpEvent, next: NextMiddleware<IncomingHttpEvent, OutgoingHttpResponse>): Promise<OutgoingHttpResponse> {
    const user = await this.userService.findUser({ id: event.get<string>('Authorization', '') })
    event.setUserResolver(() => user)
    return await next(event)
  }
}
