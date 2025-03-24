import {
  Hook,
  Provider,
  isNotEmpty,
  IBlueprint,
  IContainer,
  IAdapterHook,
  IServiceProvider,
  AdapterHookListenerContext,
} from "@stone-js/core";
import { drizzle } from 'drizzle-orm/libsql';
import { Client, Config, createClient } from '@libsql/client';

/**
 * Drizzle Service Provider
 * 
 * In this example, we are using both ServiceProvider to bind the drizzle instance to the container
 * And AdapterHook to start and stop the drizzle client
 */
@Provider()
export class DrizzleServiceProvider implements IServiceProvider, IAdapterHook {
  /**
   * Create a new instance of DrizzleServiceProvider
   * 
   * @param options
   */
  constructor(private readonly container: IContainer) {}

  /**
   * On start hook that will be called 
   * once when the application starts
   * 
   * @param context - The adapter hook listener context
   */
  @Hook('onStart')
  onStart ({ blueprint }: AdapterHookListenerContext): void {
    const config = blueprint.get<Config>('database', { url: 'file:local.db' })
    const client = createClient(config)

    blueprint.set('drizzleClient', client)
  }

  /**
   * Register services to the container
   */
  register (): void {
    const client = this.container.make<IBlueprint>('blueprint').get<Client>('drizzleClient')

    if (isNotEmpty<Client>(client)) {
      const drizzleInstance = drizzle(client)
      this.container
        .instanceIf('drizzle', drizzleInstance)
        .alias('drizzle', ['db', 'database'])
    }
  }
  
  /**
   * On stop hook that will be called 
   * once when the application stops
   * 
   * @param context - The adapter hook listener context
   */
  @Hook('onStop')
  onStop ({ blueprint }: AdapterHookListenerContext): void {
    const client = blueprint.get<Client>('drizzleClient')
    client?.close()
  }
}
