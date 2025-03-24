import { IncomingHttpEvent } from "@stone-js/http-core";
import { welcome } from "../handlers/welcomeEventHandler";
import { RouteDefinition, factoryHandler } from "@stone-js/router";

/**
 * App Route definitions
 */
export const appRouteDefinitions: Array<RouteDefinition<IncomingHttpEvent>> = [
  {
    path: '/:name?',
    handler: factoryHandler(welcome)
  }
]