import { Routing } from "@stone-js/router";
import { Browser } from "@stone-js/browser-adapter";
// import { NodeHttp } from "@stone-js/node-http-adapter";
import { ReactIncomingEvent, ReactOutgoingResponse, UseReact } from "@stone-js/use-react";
import { IApplication, IBlueprint, ILogger, LogLevel, Promiseable, StoneApp } from "@stone-js/core";

/**
 * Application
 * 
 * This is the main application entry point.
 * 
 * @StoneApp() is used to enable the Stone application, it is mandatory.
 * @Routing() is used to enable the routing feature.
 * @NodeHttp() is used to enable the Node HTTP adapter.
 * @NodeConsole() is used to enable the Node Console adapter.
 * @NodeConsole() requires the incoming event type.
 * BodyEventMiddleware is used to parse the incoming event body.
 * BodyEventMiddleware is imported because it is not installed by default.
 * 
 * You have access to the Stone's application lifecycle hooks.
 * You can also have access to them in the ServiceProviders.
 * They are optional and you can remove them if you don't need them.
 */
@Routing()
@UseReact()
// @NodeHttp({ default: true })
@Browser({ default: true })
@StoneApp({ name: 'MyApp', logger: { level: LogLevel.INFO } })
export class Application implements IApplication<ReactIncomingEvent, ReactOutgoingResponse> {
  private readonly logger: ILogger
  
  /**
   * Create a new instance of Application
   * At this point, all the dependencies are resolved and injected.
   * You can access the container and all the services.
   * 
   * @param container - The container
   */
  constructor({ logger }: { logger: ILogger }) {
    this.logger = logger
    this.logger.info('Application is created')
  }

  /**
   * Initialize the application
   * Run at each cold start.
   * At this point, you only have access to the blueprint.
   * Because the container is not yet created.
   * Note: This method is static
   */
  static onInit(blueprint: IBlueprint): void {
    const AppName = blueprint.get<string>('stone.name')
    console.log(`${AppName}'s Application initialized`)
  }

  /**
   * Prepare the application
   * Run at each warm start in server context.
   * And at each cold start in browser context.
   */
  onPrepare(): Promiseable<void> {
    this.logger.info('Application is preparing')
  }

  /**
   * Before handle the incoming event
   */
  beforeHandle(): Promiseable<void> {
    this.logger.info('Before handle incoming event')
  }

  /**
   * After the incoming event has been processed
   */
  afterHandle(): Promiseable<void> {
    this.logger.info('After handle incoming event')
  }

  /**
   * After the platform event has been sent to the user
   */
  onTerminate (): Promiseable<void> {
    this.logger.info('The event has been sent to the user')
  }
}
