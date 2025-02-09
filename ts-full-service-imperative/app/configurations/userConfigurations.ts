import { UserEvent } from "../events/UserEvent"
import { userService } from "../services/userService"
import { IncomingHttpEvent } from "@stone-js/http-core"
import { userProvider } from "../providers/userProvider"
import { userRouteDefinitions } from "../routes/userRoutes"
import { userEventListener } from "../listeners/userEventListener"
import { setCurrentUserMiddleware } from "../middleware/userMiddleware"
import { userEventSubscriber } from "../subscribers/userEventSubscriber"
import { userNotFoundErrorHandler } from "../error-handlers/userErrorHandler"
import { MetaBodyEventMiddleware, NODE_HTTP_PLATFORM } from "@stone-js/node-http-adapter"
import { listUsersCommandHandler, listUsersCommandOptions } from "../commands/userCommands"
import { factoryCommand, NODE_CONSOLE_PLATFORM, NodeCliAdapterAdapterConfig } from "@stone-js/node-cli-adapter"
import {
  IBlueprint,
  Promiseable,
  AdapterConfig,
  factoryService,
  factoryMiddleware,
  factoryErrorHandler,
  factoryEventListener,
  factoryEventSubscriber,
  factoryServiceProvider,
  FunctionalConfiguration,
} from "@stone-js/core"

/**
 * User Configurations
 * 
 * @param blueprint
 */
export const userConfigurations: FunctionalConfiguration = (blueprint: IBlueprint): Promiseable<void> => {
  blueprint
    .set('stone.router.definitions', userRouteDefinitions)
    .add('stone.liveConfigurations', [userLiveConfigurations])
    .add('stone.providers', [factoryServiceProvider(userProvider)])
    .add('stone.services', [factoryService('userService', userService)])
    .add('stone.subscribers', [factoryEventSubscriber(userEventSubscriber)])
    .add('stone.kernel.middleware', [factoryMiddleware(setCurrentUserMiddleware)])
    .add('stone.listeners', [factoryEventListener(UserEvent.USER_CREATED, userEventListener)])
    .set('stone.kernel.errorHandlers.UserNotFoundError', factoryErrorHandler(userNotFoundErrorHandler))
  
  // Add Adapter Middleware
  addAdapterMiddleware(blueprint)
  // Add Console Adapter Incoming Event
  configureConsoleAdapter(blueprint)
}

/**
 * User Live Configuration
 * Usefull for loading configuration without restarting the application.
 * Live explicit configuration takes precedence over explicit and implicit configurations.
 * Note: Only applicable for server applications.
 */
export const userLiveConfigurations: FunctionalConfiguration = async (blueprint: IBlueprint): Promise<void> => {
  blueprint.set('stone.name', await fetchConfigurationRemotly())
  console.log('I am live cause i am loaded at each request...')
}

/**
 * Fetch Configuration Remotly
 * 
 * @returns The fetched configuration
 */
const fetchConfigurationRemotly = async(): Promise<string> => {
  console.log('Fetching configuration...')
  return Promise.resolve('My Fetched app name')
}

/**
 * Add Adapter Middleware
 * 
 * @param blueprint
 */
const addAdapterMiddleware = (blueprint: IBlueprint): void => {
  blueprint
    .get<AdapterConfig[]>('stone.adapters', [])
    .filter(adapter => adapter.platform === NODE_HTTP_PLATFORM)
    .forEach((adapter: AdapterConfig) => {
      adapter.middleware ??= []
      adapter.middleware.push(MetaBodyEventMiddleware)
    })
}

/**
 * Add Console Adapter Incoming Event
 * 
 * @param blueprint
 */
const configureConsoleAdapter = (blueprint: IBlueprint): void => {
  blueprint
    .get<NodeCliAdapterAdapterConfig[]>('stone.adapters', [])
    .filter(adapter => adapter.platform === NODE_CONSOLE_PLATFORM)
    .forEach((adapter: NodeCliAdapterAdapterConfig) => {
      adapter.incomingEvent = IncomingHttpEvent
      adapter.commands ??= []
      adapter.commands.push(factoryCommand(listUsersCommandHandler, listUsersCommandOptions))
    })
}