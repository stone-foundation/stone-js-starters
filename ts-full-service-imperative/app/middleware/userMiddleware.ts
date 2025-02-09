import { UserService } from "../services/userService";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { FactoryMiddleware, FunctionalMiddleware, NextMiddleware } from "@stone-js/core";

/**
 * User Handler Options
*/
export interface SetUserMiddlewareOptions {
  userService: UserService
}

/**
 * Set current user middleware
 */
export const setCurrentUserMiddleware: FactoryMiddleware<IncomingHttpEvent, OutgoingHttpResponse> = (
  { userService }: SetUserMiddlewareOptions
): FunctionalMiddleware<IncomingHttpEvent, OutgoingHttpResponse>  => async (
  event: IncomingHttpEvent,
  next: NextMiddleware<IncomingHttpEvent, OutgoingHttpResponse>
): Promise<OutgoingHttpResponse> => {
  const user = await userService.findUser({ id: event.get<string>('Authorization', '') })
  event.setUserResolver(() => user)
  return await next(event)
}