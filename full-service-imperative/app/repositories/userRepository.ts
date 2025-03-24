import { User } from "../models/User"
import { DbFactory } from "../dummydb"
import { FactoryService } from "@stone-js/core"

/**
 * User Repository Options
 */
export interface UserRepositoryOptions {
  db: DbFactory
}

/**
 * This is the repository layer, it is responsible for interacting with the database.
 */
export interface UserRepository {
  listUsers({ limit }: { limit: number }): Promise<User[]>
  findUser(conditions: Record<string, any>): Promise<User | undefined>
  createUser({ user }: { user: any }): Promise<number | undefined>
  updateUser({ id, user }: { id: string, user: any }): Promise<User>
  deleteUser({ id }: { id: string }): Promise<void>
}

/**
 * User Repository
 */
export const userRepository: FactoryService = (
  { db }: UserRepositoryOptions
): UserRepository => ({
  async listUsers({ limit }: { limit: number }) {
    return await db('users').limit(limit).get<User>();
  },
  async findUser(conditions: Record<string, any>) {
    return await db('users').where(conditions).first<User>();
  },
  async createUser({ user }: { user: any }): Promise<number | undefined> {
    return await db('users').insert(user);
  },
  async updateUser({ id, user }: { id: string, user: any }): Promise<User> {
    return await db('users').where({ id }).update<User>(user);
  },
  async deleteUser({ id }: { id: string }): Promise<void> {
    return await db('users').where({ id }).delete();
  }
})
