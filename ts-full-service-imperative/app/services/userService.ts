import { User } from "../models/User"
import { UserEvent } from "../events/UserEvent"
import { DependencyResolver } from "@stone-js/router"
import { EventEmitter, FactoryService } from "@stone-js/core"
import { UserRepository } from "../repositories/userRepository"

/**
 * User Service Options
*/
export interface UserServiceOptions {
  eventEmitter: EventEmitter
  userRepository: UserRepository
}

/**
 * Resolve route binding
 * 
 * @param key - The key of the binding
 * @param value - The value of the binding
 * @param container - The container
*/
export const resolveRouteBinding = async(key: string, value: unknown, container?: DependencyResolver): Promise<User | undefined> => {
  const userService = container?.resolve<UserService>('userService')
  return await userService?.findUser({ [key]: value })
}

/**
 * Interface for the User Service
*/
export interface UserService {
  listUsers({ limit }: { limit: number }): Promise<User[]>
  findUser(conditions: Record<string, any>): Promise<User | undefined>
  createUser({ user }: { user: any }): Promise<void>
  updateUser({ id, user }: { id: string, user: any }): Promise<User>
  deleteUser({ id }: { id: string }): Promise<any>
}

/**
 * User Service
*/
export const userService: FactoryService = (
  { userRepository, eventEmitter }: UserServiceOptions
): UserService => ({
  async listUsers({ limit }: { limit: number }): Promise<User[]> {
    return await userRepository.listUsers({ limit });
  },
  async findUser(conditions: Record<string, any>): Promise<User | undefined> {
    return await userRepository.findUser(conditions)
  },
  async createUser({ user }: { user: any }): Promise<void> {
    await userRepository.createUser({ user });
    await eventEmitter.emit(new UserEvent(user));
  },
  async updateUser({ id, user }: { id: string, user: any }): Promise<User> {
    return await userRepository.updateUser({ id, user });
  },
  async deleteUser({ id }: { id: string }): Promise<void> {
    return await userRepository.deleteUser({ id });
  }
})
