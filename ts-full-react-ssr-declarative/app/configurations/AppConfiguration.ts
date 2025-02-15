import { Configuration, IBlueprint, IConfiguration, Promiseable } from "@stone-js/core";

/**
 * App Configuration
 */
@Configuration()
export class AppConfiguration implements IConfiguration {
  /**
   * Configure the application.
   */
  configure(blueprint: IBlueprint): Promiseable<void> {
    blueprint
      .set('app.api.baseURL', 'http://localhost:8080')
  }
}
