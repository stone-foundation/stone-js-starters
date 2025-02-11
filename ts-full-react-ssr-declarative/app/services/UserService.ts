import { UserEvent } from "../events/UserEvent"
import { User, UserInput } from "../models/User"
import { UserClient } from "../clients/UserClient"
import { UserNotFoundError } from "../errors/UserNotFoundError"
import { EventEmitter, IContainer, Service } from "@stone-js/core"

/**
 * User Service Options
*/
export interface UserServiceOptions {
  userClient: UserClient
  eventEmitter: EventEmitter
}

/**
 * User Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * And because the front-end class will be minified, we need to use alias to keep the class name.
*/
@Service({ alias: 'userService' })
export class UserService {
  private readonly userClient: UserClient
  private readonly eventEmitter: EventEmitter

  /**
   * Resolve route binding
   * 
   * @param key - The key of the binding
   * @param value - The value of the binding
   * @param container - The container
   */
  static async resolveRouteBinding(key: string, value: any, container: IContainer): Promise<User | undefined> {
    const userService = container.resolve<UserService>('userService')
    return await userService.find({ [key]: value })
  }

  /**
   * Create a new User Service
  */
  constructor({ userClient, eventEmitter }: UserServiceOptions) {
    this.userClient = userClient;
    this.eventEmitter = eventEmitter;
  }

  /**
   * List users
   * 
   * @param limit - The limit of users to list
   */
  async list (limit: number = 10): Promise<User[]> {
    return await this.userClient.list(limit)
  }

  /**
   * Find a user
   * 
   * @param conditions - The conditions to find the user
   * @returns The found user
   */
  async find (conditions: Record<string, any>): Promise<User> {
    try {
      return await this.userClient.find(conditions.id)
    } catch (error: any) {
      if (error.status === 404) {
        throw new UserNotFoundError(error.message)
      } else {
        throw error
      }
    }
  }

  /**
   * Create a user
   * 
   * @param user - The user to create
   */
  async create(user: UserInput): Promise<void> {
    await this.eventEmitter.emit(new UserEvent(user))
    await this.userClient.create(user)
  }

  /**
   * Update a user
   * 
   * @param id - The id of the user to update
   * @param user - The user data to update
   */
  async update(id: number, user: UserInput): Promise<User> {
    return await this.userClient.update(id, user)
  }

  /**
   * Delete a user
   * 
   * @param id - The id of the user to delete
   */
  async delete(id: number): Promise<void> {
    await this.userClient.delete(id)
  }
}
