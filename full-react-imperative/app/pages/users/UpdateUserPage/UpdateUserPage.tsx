import { JSX } from "react";
import { User, UserInput } from "../../../models/User";
import { UserService } from "../../../services/UserService";
import { ProfileForm } from "../../../components/ProfileForm/ProfileForm";
import { IPage, ReactIncomingEvent, PageRenderContext, definePage } from "@stone-js/use-react";

/**
 * Update User Page options.
 */
export interface UpdateUserPageOptions {
  userService: UserService
}

/**
 * Update User Page component.
 */
export const UpdateUserPage = ({}: { userService: UserService }): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext): JSX.Element {
    const user = event.get<User>('user') ?? {} as User

    return <ProfileForm user={user} onSave={() => {}} />
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
