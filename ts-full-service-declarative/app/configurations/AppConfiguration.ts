import { Config } from "@libsql/client"
// import { getString } from "@stone-js/env"
import { MetaCORSHeadersMiddleware } from "@stone-js/http-core"
import { Configuration, IBlueprint, IConfiguration, LogLevel, Promiseable } from "@stone-js/core"

/**
 * User Implicit Configuration
 * 
 * Explicit configuration takes precedence over implicit configuration.
 * Implicit configuration are defined at decorators level.
 */
@Configuration()
export class AppConfiguration implements IConfiguration {
  /**
   * Configure the application
   * 
   * @param blueprint - The blueprint to configure
   */
  configure(blueprint: IBlueprint): Promiseable<void> {
    blueprint
      .set('database', this.databaseConfig())
      .set('security', this.securityConfig())
      .set('stone.logger.level', LogLevel.INFO)
      .set('stone.http.cors.preflightStop', true)
      .set('stone.http.cors.allowedHeaders', ['*'])
      .add('stone.builder.middleware', [MetaCORSHeadersMiddleware])
  }

  /**
   * Get the database configuration
   */
  private databaseConfig(): Config {
    return {
      url: 'file:local.db'//getString('DATABASE_URL', 'file:local.db'),
    }
  }

  /**
   * Get the security configuration
   */
  private securityConfig() {
    return {
      jwt: {
        expiresIn: 3600,
      },
      secret: 'non_prod_secret',//getString('SECURITY_JWT_SECRET', 'non_prod_secret'),
      bcrypt: {
        saltRounds: 10,
      },
    }
  }
}
