import { JSX } from "react";
import { UserInput } from "../../models/User";
import { UserService } from "../../services/UserService";
import { UserForm } from "../../components/UserForm/UserForm";
import { definePage, IPage, ReactIncomingEvent, StoneLink } from "@stone-js/use-react";

/**
 * Create User Page component.
 */
export const CreateUserPage = ({ userService }: { userService: UserService }): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render (): JSX.Element {
    return (
      <>
        <h1>User form</h1>
        <UserForm onSubmit={saveUser.bind(this, userService)} />
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
export async function saveUser (userService: UserService, user: UserInput): Promise<void> {
  await userService.create(user)
}

/**
 * Create User Page Blueprint.
 */
export const CreateUserPageBlueprint = definePage(CreateUserPage, { path: '/users/create' })
