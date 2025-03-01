import { ReactNode } from "react";
import { User, UserInput } from "../../models/User";
import { UserService } from "../../services/UserService";
import { IComponentEventHandler } from "@stone-js/router";
import { UserForm } from "../../components/UserForm/UserForm";
import { Page, ReactIncomingEvent, RenderContext, StoneLink } from "@stone-js/use-react";

/**
 * Update User Page options.
 */
export interface UpdateUserPageOptions {
  userService: UserService
}

/**
 * Update User Page component.
 */
@Page('/users/:user@id(\\d+)/edit', { bindings: { user: UserService } })
export class UpdateUserPage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly userService: UserService

  /**
   * Create a new Update User Page component.
   * 
   * @param userService - The user service.
   */
  constructor ({ userService }: UpdateUserPageOptions) {
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
        <h1>Update user</h1>
        <UserForm user={user} onSubmit={async (userInput) => await this.saveUser(user?.id ?? 0, userInput)} />
        <StoneLink to={`/users/${user?.id}`}>Back to user</StoneLink>
        <StoneLink to='/users'>Go to users</StoneLink>
      </>
    )
  }

  /**
   * Save the user.
   * 
   * @param user - The user
   */
  private async saveUser (id: number, user: UserInput): Promise<void> {
    await this.userService.update(id, user)
  }
}