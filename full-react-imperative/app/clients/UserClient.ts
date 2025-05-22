import { AxiosClient } from "./AxiosClient";
import { defineStone } from "@stone-js/core";
import { User, UserInput } from "../models/User";

/**
 * User Client Options
 */
export interface UserClientOptions {
  httpClient: AxiosClient
}

/**
 * User Client Type
 */
export type UserClient = ReturnType<typeof UserClient>

/**
 * User Client
 */
export const UserClient = ({ httpClient: client }: UserClientOptions) => {
  const path = '/users'

  return {
    /**
     * List users
     * 
     * @param limit - The limit of users to list
     * @returns The list of users
     */
    async list(limit: number = 10): Promise<User[]> {
      return await client.get<User[]>(`${path}?limit=${limit}`)
    },

    /**
     * Get the current user
     * 
     * @returns The current user
     */
    async currentUser(): Promise<User> {
      return await client.get<User>(`${path}/me`)
    },

    /**
     * Find a user
     * 
     * @param id - The id of the user to find
     * @returns The found user
     */
    async find(id: number): Promise<User> {
      return await client.get<User>(`${path}/${id}`)
    },

    /**
     * Create a user
     * 
     * @param user - The user to create
     */
    async create(user: UserInput) {
      return client.post(path, user)
    },

    /**
     * Update the current user
     * 
     * @param user - The current user
     * @returns The current user
     */
    async updateCurrent(user: UserInput) {
      return client.patch(`${path}/me`, user)
    },

    /**
     * Update a user
     * 
     * @param id - The id of the user to update
     * @param user - The user to update
     * @returns The updated user
     */
    async update(id: number, user: UserInput) {
      return client.patch(`${path}/${id}`, user)
    },

    /**
     * Delete a user
     * 
     * @param id - The id of the user to delete
     */
    async delete(id: number) {
      return client.delete(`${path}/${id}`)
    }
  }
}

/**
 * User client blueprint.
*/
export const UserClientBlueprint = defineStone(UserClient, { alias: 'userClient' })
