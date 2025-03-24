import { UserEvent } from "../events/UserEvent";
import { EventEmitter, FactoryEventSubscriber, FunctionalEventSubscriber, ILogger, KernelEvent } from "@stone-js/core";

/**
 * User Event Subscriber Options
 */
export interface UserEventSubscriberOptions {
  logger: ILogger
}

/**
 * User event subscriber
 */
export const userEventSubscriber: FactoryEventSubscriber = (
  { logger }: UserEventSubscriberOptions
): FunctionalEventSubscriber => (eventEmitter: EventEmitter) => {
  eventEmitter
    .on(UserEvent.USER_CREATED, (event: UserEvent) => {
      logger.info('User event subscriber', event.user);
    })
    .on(KernelEvent.RESPONSE_PREPARED, (_event: KernelEvent) => {
      logger.info('Response was prepared')
    })
}