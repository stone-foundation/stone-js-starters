import './AppLayout.css'
import { JSX } from "react";
import { User } from "../../models/User";
import { IBlueprint, isNotEmpty } from '@stone-js/core';
import { SecurityService } from '../../services/SecurityService';
import { definePageLayout, IPageLayout, IRouter, PageLayoutRenderContext, ReactIncomingEvent, StoneLink, StoneOutlet } from "@stone-js/use-react";

/**
 * App Layout options.
 */
export interface AppLayoutOptions {
  router: IRouter
  blueprint: IBlueprint
  securityService: SecurityService
}

/**
 * App Layout component.
 */
export const AppLayout = ({ router, blueprint, securityService }: AppLayoutOptions): IPageLayout => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ container, children }: PageLayoutRenderContext): JSX.Element {
    const user = container.make<ReactIncomingEvent>('event').getUser<User>() ?? {} as User

    return (
      <div className='app-layout'>
        <header>
          <p>
            <StoneLink to='/' className='logo'>
              <img src='/logo.png' alt="Stone.js Logo" />
              <span>Stone.js</span>
            </StoneLink>
          </p>
          {isNotEmpty<User>(user) && (
            <p>
              <span>
                <img src={getUserAvatar(blueprint, user)} alt="Stone.js Logo" />
              </span>
              <span>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </span>
            </p>
          )}
          <p>
          {isNotEmpty<User>(user)
            ? <button onClick={logout.bind(this, router, securityService)}>Logout</button>
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
})

/**
 * Logout the user.
 */
export async function logout (
  router: IRouter,
  securityService: SecurityService
): Promise<void> {
  if (window.confirm('Are you sure you want to logout?')) {
    await securityService.logout()
    router.navigate('/', true)
  }
}

/**
 * Get the user avatar.
 * 
 * @param user - The user to get the avatar.
 * @returns The user avatar.
 */
export function getUserAvatar (blueprint: IBlueprint, user: User): string {
  const baseUrl = blueprint.get<string>('app.api.baseURL', '')
  return isNotEmpty<string>(user.avatar) ? `${baseUrl}/users/${user.id}/avatar` : '/assets/avatar.png'
}

/**
 * App Layout blueprint.
 */
export const AppLayoutBlueprint = definePageLayout(AppLayout, { name: 'default' })
