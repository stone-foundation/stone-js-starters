import { Stone } from "@stone-js/core";
import { AxiosClient } from "./AxiosClient";
import { User, UserInput } from "../models/User";

/**
 * User Client Options
 */
export interface UserClientOptions {
  httpClient: AxiosClient
}

/**
 * User Client
 */
@Stone({ alias: 'userClient' })
export class UserClient {
  private readonly path: string
  private readonly client: AxiosClient

  /**
   * Create a new User Client
   * 
   * @param options - The options to create the User Client.
   */
  constructor({ httpClient }: UserClientOptions) {
    this.path = '/users'
    this.client = httpClient
  }

  /**
   * List users
   * 
   * @param limit - The limit of users to list
   * @returns The list of users
   */
  async list(limit: number = 10): Promise<User[]> {
    return await this.client.get<User[]>(`${this.path}?limit=${limit}`)
  }

  /**
   * Find a user
   * 
   * @param id - The id of the user to find
   * @returns The found user
   */
  async find(id: number): Promise<User> {
    return await this.client.get<User>(`${this.path}/${id}`)
  }

  /**
   * Create a user
   * 
   * @param user - The user to create
   */
  async create(user: UserInput) {
    return this.client.post(this.path, user)
  }

  /**
   * Update a user
   * 
   * @param id - The id of the user to update
   * @param user - The user to update
   * @returns The updated user
   */
  async update(id: number, user: UserInput) {
    return this.client.patch(`${this.path}/${id}`, user)
  }

  /**
   * Delete a user
   * 
   * @param id - The id of the user to delete
   */
  async delete(id: number) {
    return this.client.delete(`${this.path}/${id}`)
  }
}
