import { routerBlueprint, defineRoute } from '@stone-js/router';
import { defineStoneApp, LogLevel, defineService } from '@stone-js/core';
import { nodeHttpAdapterBlueprint } from '@stone-js/node-http-adapter';

/**
 * Define Stone Application.
 */
const Application = defineStoneApp({
  name: 'MyApp',
  logger: {
    level: LogLevel.INFO
  }
}, [routerBlueprint, nodeHttpAdapterBlueprint]);

/**
 * Welcome Event Handler Options
*/

/**
 * Response data
 */

/**
 * Welcome
*/
const WelcomeEventHandler = ({
  welcomeService
}) => event => {
  return welcomeService.welcome(event.get('name', 'World'));
};

/**
 * WelcomeEventHandler Blueprint
 */
const WelcomeEventHandlerBlueprint = defineRoute(WelcomeEventHandler, {
  path: '/:name?',
  isFactory: true
});

/**
 * Welcome Service Options
*/

/**
 * Welcome Service Type
 */

/**
 * Welcome Service
 */
/* eslint-disable-next-line @typescript-eslint/no-redeclare */
const WelcomeService = ({
  logger
}) => ({
  /**
   * Welcome
   *
   * @param name - The name
   * @returns A welcome message
   */
  welcome(name) {
    logger.info(`Welcome ${name}`);
    return {
      message: `Hello ${name}!`
    };
  }
});

/**
 * Welcome Service Blueprint
 */
const WelcomeServiceBlueprint = defineService(WelcomeService, {
  alias: 'welcomeService',
  isFactory: true
});

export { Application, WelcomeEventHandler, WelcomeEventHandlerBlueprint, WelcomeService, WelcomeServiceBlueprint };
