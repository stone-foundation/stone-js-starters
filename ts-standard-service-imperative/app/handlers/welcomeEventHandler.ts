import { IncomingHttpEvent } from "@stone-js/http-core";
import { WelcomeService } from "../services/welcomeService";
import { FactoryEventHandler, FunctionalEventHandler } from "@stone-js/router";

/**
 * Welcome Event Handler Options
*/
export interface WelcomeEventHandlerOptions {
  welcomeService: WelcomeService
}

/**
 * Welcome
*/
export const welcome: FactoryEventHandler<IncomingHttpEvent> = (
  { welcomeService }: WelcomeEventHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => (event: IncomingHttpEvent): { message: string } => {
  return welcomeService.welcome(event.get<string>('name', 'World'))
}
