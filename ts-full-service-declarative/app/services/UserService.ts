import { User } from "../models/User"
import { UserEvent } from "../events/UserEvent"
import { UserRepository } from "../repositories/UserRepository"
import { EventEmitter, IContainer, Service } from "@stone-js/core"
import { UserNotFoundError } from "../errors/UserNotFoundError"

/**
 * User Service Options
*/
export interface UserServiceOptions {
  eventEmitter: EventEmitter
  userRepository: UserRepository
}

/**
 * User Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
*/
@Service({ alias: 'userService' })
export class UserService {
  private readonly eventEmitter: EventEmitter
  private readonly userRepository: UserRepository

  /**
   * Resolve route binding
   * 
   * @param key - The key of the binding
   * @param value - The value of the binding
   * @param container - The container
   */
  static async resolveRouteBinding(key: string, value: string, container: IContainer): Promise<User | undefined> {
    const userService = container.resolve<UserService>('userService')
    return await userService.findUser({ [key]: value })
  }

  /**
   * Create a new User Service
  */
  constructor({ userRepository, eventEmitter }: UserServiceOptions) {
    this.eventEmitter = eventEmitter;
    this.userRepository = userRepository;
  }

  /**
   * List users
   * 
   * @param limit - The limit of users to list
   */
  async listUsers({ limit }: { limit: number }): Promise<User[]> {
    return await this.userRepository.listUsers({ limit });
  }

  /**
   * Find a user
   * 
   * @param id - The id of the user to find
   */
  async findUser(conditions: Record<string, any>): Promise<User | undefined> {
    return await this.userRepository.findUser(conditions)
  }

  /**
   * Create a user
   * 
   * @param user - The user to create
   */
  async createUser({ user }: { user: unknown }): Promise<void> {
    await this.userRepository.createUser({ user });
    await this.eventEmitter.emit(new UserEvent(user));
  }

  /**
   * Update a user
   * 
   * @param id - The id of the user to update
   * @param user - The user data to update
   */
  async updateUser({ id, user }: { id: string, user: unknown }): Promise<User> {
    const oldUser = await this.userRepository.findUser({ id });
    if (oldUser === undefined) {
      throw new UserNotFoundError(`The User with this id ${id} was not found`);
    }
    return await this.userRepository.updateUser({ id, user });
  }

  /**
   * Delete a user
   * 
   * @param id - The id of the user to delete
   */
  async deleteUser({ id }: { id: string }): Promise<void> {
    return await this.userRepository.deleteUser({ id });
  }
}
