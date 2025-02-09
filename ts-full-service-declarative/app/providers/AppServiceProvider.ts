import { Dummydb } from "../Dummydb";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { IBlueprint, IContainer, IServiceProvider, Provider } from "@stone-js/core";

/**
 * App Service Provider Options
 */
export interface AppServiceProviderOptions {
  container: IContainer
}

/**
 * App Service Provider
 */
@Provider()
export class AppServiceProvider implements IServiceProvider<IncomingHttpEvent, OutgoingHttpResponse> {
  private readonly container: IContainer
  
  /**
   * Create a new instance of AppServiceProvider
   * 
   * @param options
   */
  constructor({ container }: AppServiceProviderOptions) {
    this.container = container
  }

  /**
   * Register services to the container
   */
  register(): void {
    this.container.singletonIf('db', (container) => new Dummydb({ blueprint: container.make<IBlueprint>('blueprint') }))
  }
}
