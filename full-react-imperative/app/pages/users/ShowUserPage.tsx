import { JSX } from "react";
import { User } from "../../models/User";
import { isNotEmpty } from "@stone-js/core";
import { UserService } from "../../services/UserService";
import { IPage, ReactIncomingEvent, PageRenderContext, StoneLink, definePage } from "@stone-js/use-react";

/**
 * Show User Page options.
 */
export interface ShowUserPageOptions {
  userService: UserService
}

/**
 * Show User Page component.
 */
export const ShowUserPage = ({ userService }: { userService: UserService }): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext): JSX.Element {
    const user = event.get<User>('user')

    return (
      <>
        <h1>Show user</h1>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <StoneLink to={`/users/${user?.id}/edit`}>Edit</StoneLink>
        <button onClick={async () => await deleteUser(userService, user)}>Delete</button>
        <StoneLink to='/users'>Go to users</StoneLink>
      </>
    )
  }
})

/**
 * Delete the user.
 * 
 * @param container - The container.
 * @param user - The user
 */
export async function deleteUser (userService: UserService, user?: User): Promise<void> {
  if (isNotEmpty<User>(user) && window.confirm('Are you sure you want to delete this user?')) {
    await userService.delete(user.id)
  }
}

/**
 * Show User Page Blueprint.
 */
export const ShowUserPageBlueprint = definePage(
  ShowUserPage,
  {
    path: '/users/:user@id(\\d+)',
    bindings: { user: 'userService@findBy' } 
  }
)
