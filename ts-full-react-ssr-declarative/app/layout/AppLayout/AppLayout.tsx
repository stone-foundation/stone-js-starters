import './AppLayout.css'
import { ReactNode } from "react";
import { User } from "../../models/User";
import { IBlueprint, isNotEmpty } from '@stone-js/core';
import { IComponentEventHandler } from "@stone-js/router";
import { SecurityService } from '../../services/SecurityService';
import { PageLayout, ReactIncomingEvent, RenderLayoutContext, StoneLink, StoneOutlet } from "@stone-js/use-react";

/**
 * App Layout options.
 */
export interface AppLayoutOptions {
  blueprint: IBlueprint
  securityService: SecurityService
}

/**
 * App Layout component.
 */
@PageLayout({ name: 'default' })
export class AppLayout implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly blueprint: IBlueprint
  private readonly securityService: SecurityService

  /**
   * Create a new App Layout component.
   * 
   * @param options - The options to create the App Layout component.
   */
  constructor ({ blueprint, securityService }: AppLayoutOptions) {
    this.blueprint = blueprint
    this.securityService = securityService
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event, children }: RenderLayoutContext<ReactNode>) {
    const user = event.getUser<User>() ?? {} as User

    return (
      <div className="container">
        <header>
          <p>
            <img src="/assets/stonejs.png" alt="Stone.js Logo" />
          </p>
          {isNotEmpty<User>(user) && (
            <p>
              <span>
                <img src={this.getUserAvatar(user)} alt="Stone.js Logo" />
              </span>
              <span>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </span>
            </p>
          )}
          <p>
          {isNotEmpty<User>(user)
            ? <button onClick={this.logout}>Logout</button>
            : <StoneLink to='/login'>Login</StoneLink>
          }
          </p>
        </header>
        <main>
          <StoneOutlet>{children}</StoneOutlet>
        </main>
        <footer>&copy; 2025 Stone.js</footer>
      </div>
    )
  }

  /**
   * Logout the user.
   */
  async logout (): Promise<void> {
    if (window.confirm('Are you sure you want to logout?')) {
      await this.securityService.logout()
    }
  }

  /**
   * Get the user avatar.
   * 
   * @param user - The user to get the avatar.
   * @returns The user avatar.
   */
  private getUserAvatar (user: User): string {
    const baseUrl = this.blueprint.get<string>('app.api.baseURL', '')
    return isNotEmpty<string>(user.avatar) ? `${baseUrl}/users/${user.id}/avatar` : '/assets/avatar.png'
  }
}
