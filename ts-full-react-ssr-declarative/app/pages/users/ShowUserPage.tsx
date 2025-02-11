import { ReactNode } from "react";
import { User } from "../../models/User";
import { UserService } from "../../services/UserService";
import { IContainer, isNotEmpty } from "@stone-js/core";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent, RenderContext, StoneLink } from "@stone-js/use-react";

/**
 * Show User Page component.
 */
@Page('/users/:user@id(\\d+)', { bindings: { user: UserService } })
export class ShowUserPage implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Handle the incoming event.
   * 
   * @param event - The incoming event.
   * @returns The outgoing response data.
   */
  handle (event: ReactIncomingEvent): User | undefined {
    return event.get<User>('user')
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ data: user, container }: RenderContext<User>): ReactNode {
    return (
      <>
        <h1>Show user</h1>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <StoneLink to={`/users/edit/${user?.id}`}>Edit</StoneLink>
        <button onClick={() => this.deleteUser(container, user)}>Delete</button>
      </>
    )
  }

  private deleteUser (container: IContainer, user?: User): void {
    if (isNotEmpty<User>(user)) {
      const res = window.prompt('Are you sure you want to delete this user?')

      if (res?.toLowerCase() === 'yes') {
        container
          .make<UserService>('userService')
          .deleteUser({ id: user.id })
          .then(() => {
            console.log('user deleted')
          })
      }
    }
  }
}
