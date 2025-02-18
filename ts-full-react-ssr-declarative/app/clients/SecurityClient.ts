
import { Stone } from "@stone-js/core";
import { AxiosClient } from "./AxiosClient";
import { UserChangePassword, UserLogin, UserRegister, UserToken } from "../models/User";

/**
 * Security Client Options
*/
export interface SecurityClientOptions {
  httpClient: AxiosClient
}

/**
 * Security Client
 */
@Stone({ alias: 'securityClient' })
export class SecurityClient {
  private readonly client: AxiosClient

  /**
   * Create a new Security Client
   * 
   * @param options - The options to create the Security Client.
   */
  constructor({ httpClient }: SecurityClientOptions) {
    this.client = httpClient
  }

  /**
   * Login a user
   * 
   * @param user - The user to login
   * @returns The user token
   */
  async login(user: UserLogin): Promise<UserToken> {
    return await this.client.post<UserToken>('/login', user)
  }

  /**
   * Refresh the user token
   * 
   * @returns The user token
   */
  async refresh(): Promise<UserToken> {
    return await this.client.post<UserToken>('/refresh')
  }

  /**
   * Logout a user
   */
  async logout(): Promise<void> {
    await this.client.post<UserToken>('/logout')
  }

  /**
   * Register a user
   * 
   * @param user - The user to register
   */
  async register(user: UserRegister): Promise<void> {
    await this.client.post('/register', user)
  }

  /**
   * Change the user password
   * 
   * @param password - The password to change
   */
  async changePassword(password: UserChangePassword): Promise<void> {
    await this.client.patch('/change-password', password)
  }
}
