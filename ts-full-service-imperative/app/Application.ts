import { routerBlueprint } from "@stone-js/router";
import { LogLevel, stoneApp, stoneBlueprint } from "@stone-js/core";
import { nodeHttpAdapterBlueprint } from "@stone-js/node-http-adapter";
import { userConfigurations } from "./configurations/userConfigurations";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { NODE_CONSOLE_PLATFORM, nodeCliAdapterBlueprint } from "@stone-js/node-cli-adapter";

/**
 * Use the Stone builder to create, configure and run the application.
 * Export the result that could be an handler in serverless context.
 * Otherwise, it could be used as a server in a Node.js environment.
 */
export const stone = await stoneApp<IncomingHttpEvent, OutgoingHttpResponse>()
  .use(
    stoneBlueprint,
    routerBlueprint,
    nodeCliAdapterBlueprint,
    nodeHttpAdapterBlueprint
  )
  .configure(userConfigurations)
  .set('stone.logger.level', LogLevel.INFO)
  .set('stone.adapter.platform', NODE_CONSOLE_PLATFORM)
  .run()