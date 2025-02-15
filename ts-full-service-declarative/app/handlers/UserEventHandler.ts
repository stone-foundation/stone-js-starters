import { ILogger } from "@stone-js/core";
import { File } from "@stone-js/filesystem";
import { UserService } from '../services/UserService';
import { User, UserModel, UserResponse } from '../models/User';
import { Delete, EventHandler, Get, Patch, Post } from "@stone-js/router";
import { FileHttpResponse, IncomingHttpEvent, JsonHttpResponse, NoContentHttpResponse } from "@stone-js/http-core";

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
  async list(event: IncomingHttpEvent): Promise<UserResponse[]> {
    return await this.userService.list(event.get<number>('limit', 10))
  }

  /**
   * Show current user
   * 
   * @param event - IncomingHttpEvent
   * @returns User
  */
  @Get('/me')
  showCurrent(event: IncomingHttpEvent): UserResponse {
    const user = { ...event.getUser<UserModel>(), password: undefined }
    return user as UserResponse
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
  show(event: IncomingHttpEvent): UserResponse {
    return event.get<UserResponse>('user', {} as UserResponse)
  }

  /**
   * Show a user avatar
   * 
   * @param event - IncomingHttpEvent
   * @returns File
   * @throws FileError if the file is not valid.
   * @throws NotFoundError if the user is not found.
   */
  @Get('/:user@id(\\d+)/avatar', { bindings: { user: UserService } })
  @FileHttpResponse()
  avatar(event: IncomingHttpEvent): File {
    const user = event.get<UserResponse>('user', {} as UserResponse)
    return File.create(`public/uploads/${user.avatar}`)
  }

  /**
   * Create a user
   * 
   * With explicit no content json response type.
   * Using headers to define the content type.
  */
  @Post('/')
  @NoContentHttpResponse({ 'content-type': 'application/json' })
  async create(event: IncomingHttpEvent): Promise<void> {
    const payload = event.getBody<UserModel>({} as any)

    if (event.hasFile('avatar')) {
      const file = event.getFile('avatar')?.[0]
      payload.avatar = `${crypto.randomUUID()}-${file?.getClientOriginalName()}`
      event.getFile('avatar')?.[0]?.move('public/uploads', payload.avatar)
    }

    await this.userService.create(payload)
  }

  /**
   * Update the current user
   * 
   * With explicit rules definition.
  */
  @Patch('/me')
  @JsonHttpResponse(204)
  async updateCurrent(event: IncomingHttpEvent): Promise<UserResponse> {
    return await this.userService.update(event.getUser<UserModel>()?.id ?? 0, event.getBody<UserModel>({} as any))
  }

  /**
   * Update a user
   * 
   * With explicit rules definition.
  */
  @Patch('/:id', { rules: { id: /\d+/ } })
  @JsonHttpResponse(204)
  async update(event: IncomingHttpEvent): Promise<UserResponse> {
    return await this.userService.update(event.get<number>('id', 0), event.getBody<UserModel>({} as any))
  }

  /**
   * Delete a user
   * 
   * Explcitily returning a status code.
  */
  @Delete('/:id')
  async delete(event: IncomingHttpEvent): Promise<unknown> {
    await this.userService.delete(event.get<number>('id', 0))
    this.logger.info(`User deleted: ${event.get<number>('id')}, by user: ${event.getUser<User>()?.id}`)
    return { statusCode : 204 }
  }
}
