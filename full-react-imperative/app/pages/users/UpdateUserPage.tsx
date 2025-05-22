import { JSX } from "react";
import { User, UserInput } from "../../models/User";
import { UserService } from "../../services/UserService";
import { UserForm } from "../../components/UserForm/UserForm";
import { IPage, ReactIncomingEvent, PageRenderContext, StoneLink, definePage } from "@stone-js/use-react";

/**
 * Update User Page options.
 */
export interface UpdateUserPageOptions {
  userService: UserService
}

/**
 * Update User Page component.
 */
export const UpdateUserPage = ({ userService }: { userService: UserService }): IPage<ReactIncomingEvent> => ({
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
        <h1>Update user</h1>
        <UserForm user={user} onSubmit={async (userInput) => await saveUser(userService, user?.id ?? 0, userInput)} />
        <StoneLink to={`/users/${user?.id}`}>Back to user</StoneLink>
        <StoneLink to='/users'>Go to users</StoneLink>
      </>
    )
  }
})

/**
 * Save the user.
 * 
 * @param user - The user
 */
export async function saveUser (userService: UserService, id: number, user: UserInput): Promise<void> {
  await userService.update(id, user)
}

/**
 * Update User Page Blueprint.
 */
export const UpdateUserPageBlueprint = definePage(UpdateUserPage, { path: '/users/:user@id(\\d+)/edit' })
