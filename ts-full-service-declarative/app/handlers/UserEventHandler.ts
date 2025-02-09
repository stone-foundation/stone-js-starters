import { User } from '../models/User';
import { ILogger } from "@stone-js/core";
import { UserService } from '../services/UserService';
import { Delete, EventHandler, Get, Patch, Post } from "@stone-js/router";
import { IncomingHttpEvent, JsonHttpResponse, NoContentHttpResponse } from "@stone-js/http-core";
/**
 * User Event Handler Options
*/
export interface UserEventHandlerOptions {
  logger: ILogger
  userService: UserService
}

/**
 * User Event Handler
 * 
 * @EventHandler() is a decorator that marks a class as a handler.
 * @EventHandler() think about it as a controller in other frameworks.
 * Stone.js also provides a @Controller() decorator that is an alias to @EventHandler().
 * If you are familiar with other frameworks, you can use @Controller() instead of @EventHandler().
*/
@EventHandler('/users', { name: 'users' })
export class UserEventHandler {
  private readonly logger: ILogger
  private readonly userService: UserService

  /**
   * Create a new instance of UserEventHandler
   * 
   * @param userService
   * @param logger
   */
  constructor({ userService, logger }: UserEventHandlerOptions) {
    this.logger = logger
    this.userService = userService
  }

  /**
   * List all users
   * 
   * With explicit json response type.
  */
  @Get('/', { name: 'list' })
  @JsonHttpResponse(200)
  async listUsers (event: IncomingHttpEvent): Promise<User[]> {
    return await this.userService.listUsers({ limit: event.get<number>('limit', 10) })
  }

  /**
   * Show a user
   * 
   * With implicit rules definition.
   * Explicit bindings definition for model resolution.
   * Implicit json response type.
   * Because literal object is returned as json.
  */
  @Get('/:user@id(\\d+)', { bindings: { user: UserService } })
  showUser (event: IncomingHttpEvent): User {
    return event.get<User>('user', {} as User)
  }

  /**
   * Create a user
   * 
   * With explicit no content json response type.
   * Using headers to define the content type.
  */
  @Post('/')
  @NoContentHttpResponse({ 'content-type': 'application/json' })
  async createUser (event: IncomingHttpEvent): Promise<void> {
    await this.userService.createUser({ user: event.body })
  }

  /**
   * Update a user
   * 
   * With explicit rules definition.
  */
  @Patch('/:id', { rules: { id: /\d+/ } })
  @JsonHttpResponse(204)
  async updateUser (event: IncomingHttpEvent): Promise<User> {
    return await this.userService.updateUser({ id: event.get<string>('id', ''), user: event.body })
  }

  /**
   * Delete a user
   * 
   * Explcitily returning a status code.
  */
  @Delete('/:id')
  async deleteUser (event: IncomingHttpEvent): Promise<unknown> {
    this.logger.info('Currennt connected User', event.getUser())
    await this.userService.deleteUser({ id: event.get<string>('id', '') })
    return { statusCode : 204 }
  }
}
