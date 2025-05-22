
import { Axios } from "axios";
import { AxiosClient } from "./AxiosClient";
import { defineStone } from "@stone-js/core";
import { UserChangePassword, UserLogin, UserRegister, UserToken } from "../models/User";

/**
 * Security Client Options
*/
export interface SecurityClientOptions {
  axios: Axios
  httpClient: AxiosClient
}

/**
 * Security Client Type
*/
export type SecurityClient = ReturnType<typeof SecurityClient>

/**
 * Security Client
 */
export const SecurityClient  = ({ axios, httpClient: client }: SecurityClientOptions) => {
  return {
    /**
     * Login a user
     * 
     * @param user - The user to login
     */
    async login(user: UserLogin): Promise<UserToken> {
      return (await axios.post<UserToken>('/login', user)).data
    },

    /**
     * Logout a user
     */
    async logout(): Promise<void> {
      await client.post<UserToken>('/logout')
    },

    /**
     * Register a user
     * 
     * @param user - The user to register
     */
    async register(user: UserRegister): Promise<void> {
      await axios.post('/register', user)
    },

    /**
     * Change the user password
     * 
     * @param password - The password to change
     */
    async changePassword(password: UserChangePassword): Promise<void> {
      await client.patch('/change-password', password)
    }
  }
}

/**
 * Security Client blueprint.
*/
export const SecurityClientBlueprint = defineStone(SecurityClient, { alias: 'securityClient' })
