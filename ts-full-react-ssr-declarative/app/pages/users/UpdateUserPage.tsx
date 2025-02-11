import { User } from "../../models/User";
import { UserForm } from "../../components/UserForm";
import { UserService } from "../../services/UserService";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent, RenderContext } from "@stone-js/use-react";

/**
 * Update User Page component.
 */
@Page('/users/:user@id(\\d+)/edit')
export class UpdateUserPage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly userService: UserService

  /**
   * Create a new Update User Page component.
   * 
   * @param userService - The user service.
   */
  constructor ({ userService }: { userService: UserService }) {
    this.userService = userService
  }

  /**
   * Handle the incoming event.
   * 
   * @param event - The incoming event.
   * @returns The event data.
   */
  async handle (event: ReactIncomingEvent): Promise<User> {
    return await this.userService.findUser({ id: event.get<string>('id') })
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ data }: RenderContext<User>) {
    return (
      <>
        <h1>Update user</h1>
        <UserForm value={data} handleSubmit={this.saveUser} />
      </>
    )
  }

  private saveUser (user: User) {
    console.log('user saved', user)
    this.userService.updateUser({ id: user.id, user }).then(() => {
      console.log('user updated')
    })
  }
}