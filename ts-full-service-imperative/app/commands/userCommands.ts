import { UserService } from "../services/userService";
import { ILogger, IncomingEvent } from "@stone-js/core";
import { CommandBuilder, FactoryCommandHandler } from "@stone-js/node-cli-adapter";

/**
 * ListUsersCommandOptions
*/
export interface ListUsersCommandOptions {
  logger: ILogger
  userService: UserService
}

/**
 * List users command options
 */
export const listUsersCommandOptions = {
  alias: 'lu',
  name: 'list-users',
  desc: 'List users',
  options: (yargs: CommandBuilder) => {
    return yargs
      .option('limit', {
        alias: 'l',
        type: 'number',
        default: false,
        desc: 'Number of users to list'
      })
  }
}

/**
 * List users command
 */
export const listUsersCommandHandler: FactoryCommandHandler<IncomingEvent> = ({ logger, userService }: ListUsersCommandOptions) => ({
  async handle (event: IncomingEvent) {
    const limit = event.get<number>('limit', 10);
    const users = await userService.listUsers({ limit });
    logger.info('List users command', users);
  }
})
