export { stoneApp } from "@stone-js/core";
import { Routing } from "@stone-js/router";
import { UserService } from "./services/UserService";
import { NodeConsole } from "@stone-js/node-cli-adapter";
export { NODE_CONSOLE_PLATFORM } from "@stone-js/node-cli-adapter";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { IApplication, IBlueprint, ILogger, LogLevel, Promiseable, StoneApp } from "@stone-js/core";
import { MetaBodyEventMiddleware, MetaFilesEventMiddleware, NodeHttp } from "@stone-js/node-http-adapter";

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
@NodeConsole({ incomingEvent: IncomingHttpEvent })
@StoneApp({ name: 'MyApp', logger: { level: LogLevel.INFO } })
@NodeHttp({ middleware: [MetaBodyEventMiddleware, MetaFilesEventMiddleware], default: true })
export class Application implements IApplication<IncomingHttpEvent, OutgoingHttpResponse> {
  private readonly logger: ILogger
  
  /**
   * Create a new instance of Application
   * At this point, all the dependencies are resolved and injected.
   * You can access the container and all the services.
   * 
   * @param container - The container
   */
  constructor({ userService, logger }: { userService: UserService, logger: ILogger }) {
    this.logger = logger
    this.logger.info('Application is created')
    this.logger.info('User Service:', userService)
  }

  /**
   * Initialize the application
   * Run at each cold start.
   * At this point, you only have access to the blueprint.
   * Because the container is not yet created.
   * Note: This method is static
   * 
   * @param blueprint - The blueprint
   */
  static onStart(blueprint: IBlueprint): void {
    const AppName = blueprint.get<string>('stone.name')
    console.log(`${AppName}'s Application started`)
  }

  /**
   * Stop the application
   * Run just before the application stops.
   * Note: This method is static
   * 
   * @param blueprint - The blueprint
   */
  static onStop(blueprint: IBlueprint): void {
    const AppName = blueprint.get<string>('stone.name')
    console.log(`${AppName}'s Application stopped`)
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
