import { DummydbConnectOptions } from "../Dummydb"
import { Configuration, IBlueprint, IConfiguration, LogLevel, Promiseable } from "@stone-js/core"

/**
 * User Implicit Configuration
 * 
 * Explicit configuration takes precedence over implicit configuration.
 * Implicit configuration are defined at decorators level.
 */
@Configuration()
export class UserConfiguration implements IConfiguration {
  /**
   * Configure the application
   * 
   * @param blueprint - The blueprint to configure
   */
  configure(blueprint: IBlueprint): Promiseable<void> {
    blueprint.set('dummydb', this.getDummyDbConfig())
    blueprint.set('stone.logger.level', LogLevel.INFO)
    console.log('I am loaded once...')
  }

  /**
   * Get the dummy db configuration
   */
  private getDummyDbConfig(): DummydbConnectOptions {
    return {
      name: 'mydummydb',
      host: 'localhost',
      username: 'root',
      password: 'root'
    }
  }
}
