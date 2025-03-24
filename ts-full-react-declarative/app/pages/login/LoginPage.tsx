import './LoginPage.css'
import { IBlueprint } from '@stone-js/core';
import { UserLogin } from "../../models/User";
import { IComponentEventHandler } from "@stone-js/router";
import { SecurityService } from "../../services/SecurityService";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ErrorManager, IRouter, Page, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Login Page options.
 */
interface LoginPageOptions {
  router: IRouter
  blueprint: IBlueprint
  errorManager: ErrorManager
  securityService: SecurityService
}

/**
 * Login Page component.
 */
@Page('/login', { layout: 'security' })
export class LoginPage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly router: IRouter
  private readonly blueprint: IBlueprint
  private readonly securityService: SecurityService

  /**
   * Create a new Login Page component.
   * 
   * @param options - The options to create the Login Page component.
   */
  constructor ({ router, blueprint, securityService }: LoginPageOptions) {
    this.router = router
    this.blueprint = blueprint
    this.securityService = securityService
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render (): ReactNode {
    const [error, setError] = useState<boolean>(false)

    return (
      <div>
        <LoginForm
          error={error}
          onSubmit={async (user: UserLogin) => await this.login(user, setError)}
        />
      </div>
    )
  }

  /**
   * Login the user.
   * 
   * @param user - The user to login.
   */
  private async login (
    user: UserLogin,
    setError: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try {
      await this.securityService.login(user)
      this.router.navigate(this.blueprint.get('app.requestedUrl', '/'), true)
    } catch (_: any) {
      setError(true)
    }
  }
}
