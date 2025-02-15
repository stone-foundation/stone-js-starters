import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { Client, Config, createClient } from '@libsql/client';
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { IBlueprint, IContainer, IServiceProvider, Provider } from "@stone-js/core";

/**
 * Drizzle client instance
 */
let drizzleInstance: LibSQLDatabase

/**
 * Drizzle client instance
 */
let client: Client

/**
 * Drizzle Service Provider
 */
@Provider()
export class DrizzleServiceProvider implements IServiceProvider<IncomingHttpEvent, OutgoingHttpResponse> {
  /**
   * On start hook that will be called 
   * once when the application starts
   */
  static onStart(blueprint: IBlueprint): void {
    const config = blueprint.get<Config>(
      'database', { url: 'file:local.db' }
    )
    client = createClient(config)
    drizzleInstance = drizzle(client)
  }

  /**
   * On stop hook that will be called 
   * once when the application stops
   */
  static onStop(): void {
    client.close()
  }
  
  /**
   * Create a new instance of DrizzleServiceProvider
   * 
   * @param options
   */
  constructor(private readonly container: IContainer) {}

  /**
   * Register services to the container
   */
  register(): void {
    this
      .container
      .instanceIf('drizzle', drizzleInstance)
      .alias('drizzle', ['db', 'database'])
  }
}
