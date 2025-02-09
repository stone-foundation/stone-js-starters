import { UserEvent } from "../events/UserEvent";
import { FactoryEventListener, FunctionalEventListener, ILogger } from "@stone-js/core";

/**
 * User Event Listener Options
*/
export interface UserEventListenerOptions {
  logger: ILogger
}

/**
 * User event listener
 */
export const userEventListener: FactoryEventListener<UserEvent> = (
  { logger }: UserEventListenerOptions
): FunctionalEventListener<UserEvent> => (event: UserEvent): void => {
  logger.info('User event listener', event)
}