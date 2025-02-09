
import { appRouteDefinitions } from "../routes/userRoutes"
import { welcomeService } from "../services/welcomeService"
import { IBlueprint, Promiseable, factoryService, FunctionalConfiguration } from "@stone-js/core"

/**
 * App Configurations
 * 
 * @param blueprint
 */
export const appConfigurations: FunctionalConfiguration = (blueprint: IBlueprint): Promiseable<void> => {
  blueprint
    .set('stone.router.definitions', appRouteDefinitions)
    .add('stone.services', [factoryService('welcomeService', welcomeService)])
}
