import { ReactIncomingEvent } from "@stone-js/use-react"
import { SecurityClient } from "../clients/SecurityClient"
import { IContainer, isNotEmpty, Service } from "@stone-js/core"
import { UserChangePassword, UserLogin, UserRegister, UserToken } from "../models/User"

/**
 * Security Service Options
*/
export interface SecurityServiceOptions {
  container: IContainer
  securityClient: SecurityClient
}

/**
 * Security Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * And because the front-end class will be minified, we need to use alias to keep the class name.
*/
@Service({ alias: 'securityService' })
export class SecurityService {
  private token?: UserToken
  private readonly container: IContainer
  private readonly securityClient: SecurityClient

  /**
   * Create a new Security Service
  */
  constructor({ container, securityClient }: SecurityServiceOptions) {
    this.container = container
    this.securityClient = securityClient;
  }

  /**
   * Login a user
   * 
   * @param user - The user to login
   * @returns The user token
  */
  async login(user: UserLogin): Promise<UserToken> {
    return await this.securityClient.login(user)
  }

  /**
   * Register a user
   * 
   * @param user - The user to register
  */
  async register(user: UserRegister): Promise<void> {
    await this.securityClient.register(user)
  }

  /**
   * Change the user password
   * 
   * @param password - The password to change
  */
  async changePassword(password: UserChangePassword): Promise<void> {
    await this.securityClient.changePassword(password)
  }

  /**
   * Set the token
   * 
   * The event must be resolved on demand 
   * because the event is not available at the time of service creation.
   * The event is available only when the request is made.
   * 
   * @param token - The token to set
  */
  saveToken(token: UserToken): void {
    this.container.make<ReactIncomingEvent>('event').cookies.add(
      'token',
      { ...token, createdAt: Date.now() },
      {
        secure: true,
        httpOnly: false,
        expires: new Date(token.createdAt + token.expiresIn)
      }
    )
  }

  /**
   * Get the token
   * 
   * The event must be resolved on demand 
   * because the event is not available at the time of service creation.
   * The event is available only when the request is made.
   * 
   * @returns The token
  */
  getToken(): UserToken | undefined {
    return this.container.make<ReactIncomingEvent>('event').cookies.getValue('token')
  }

  /**
   * Get the access token
   * 
   * @returns The access token
   */
  getAccessToken(): string | undefined {
    return this.getToken()?.accessToken
  }

  /**
   * Check if the user is authenticated
   * 
   * @returns True if the user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    this.token ??= this.getToken()
    return isNotEmpty<UserToken>(this.token) && (this.token.createdAt + this.token.expiresIn) > Date.now()
  }
}
