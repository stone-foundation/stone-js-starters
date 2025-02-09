import { Dummydb } from "../Dummydb"
import { User } from "../models/User"
import { Stone } from "@stone-js/core"

/**
 * User Repository Options
 */
export interface UserRepositoryOptions {
  db: Dummydb
}

/**
 * User Repository
 * 
 * @Stone() is a decorator that marks a class as a Stone component.
 * @Stone() Think of it like a Bean in Spring or a Component in Angular.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * @Service() is an alias of @Stone() decorator.
 */
@Stone({ alias: 'userRepository' })
export class UserRepository {
  private readonly db: Dummydb

  constructor({ db }: UserRepositoryOptions) {
    this.db = db
  }

  /**
   * List users
   * 
   * @param limit - The limit of users to list
   * @returns The list of users
   */
  async listUsers({ limit }: { limit: number }): Promise<User[]> {
    return await this.db.table('users').limit(limit).get();
  }

  /**
   * Find a user
   * 
   * @param id - The id of the user to find
   * @returns The user
   */
  async findUser(conditions: Record<string, any>): Promise<User | undefined> {
    return await this.db.table('users').where(conditions).first();
  }

  /**
   * Create a user
   * 
   * @param user - The user to create
   * @returns The id of the created
   */
  async createUser({ user }: { user: any }): Promise<number | undefined> {
    return await this.db.table('users').insert(user);
  }

  /**
   * Update a user
   * 
   * @param id - The id of the user to update
   * @param user - The user data to update
   * @returns The number of updated users
   */
  async updateUser({ id, user }: { id: string, user: any }): Promise<User> {
    return await this.db.table('users').where({ id }).update(user);
  }

  /**
   * Delete a user
   * 
   * @param id - The id of the user to delete
   * @returns The number of deleted users
   */
  async deleteUser({ id }: { id: string }): Promise<void> {
    return await this.db.table('users').where({ id }).delete();
  }
}
