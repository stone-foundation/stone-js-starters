import { ReactNode } from "react";
import { User } from "../../models/User";
import { isNotEmpty } from "@stone-js/core";
import { UserService } from "../../services/UserService";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent, RenderContext, StoneLink } from "@stone-js/use-react";

/**
 * Show User Page options.
 */
export interface ShowUserPageOptions {
  userService: UserService
}

/**
 * Show User Page component.
 */
@Page('/users/:user@id(\\d+)', { bindings: { user: UserService } })
export class ShowUserPage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly userService: UserService

  /**
   * Create a new Show User Page component.
   * 
   * @param options - The options to create the Show User Page component.
   */
  constructor ({ userService }: ShowUserPageOptions) {
    this.userService = userService
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: RenderContext): ReactNode {
    const user = event.get<User>('user')

    return (
      <>
        <h1>Show user</h1>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <StoneLink to={`/users/${user?.id}/edit`}>Edit</StoneLink>
        <button onClick={async () => await this.deleteUser(user)}>Delete</button>
        <StoneLink to='/users'>Go to users</StoneLink>
      </>
    )
  }

  /**
   * Delete the user.
   * 
   * @param container - The container.
   * @param user - The user
   */
  private async deleteUser (user?: User): Promise<void> {
    if (isNotEmpty<User>(user) && window.confirm('Are you sure you want to delete this user?')) {
      await this.userService.delete(user.id)
    }
  }
}
