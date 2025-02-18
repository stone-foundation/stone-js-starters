import { UserInput } from "../../models/User";
import { UserService } from "../../services/UserService";
import { IComponentEventHandler } from "@stone-js/router";
import { UserForm } from "../../components/UserForm/UserForm";
import { Page, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Create Post Page component.
 */
@Page('/posts/create')
export class CreatePostPage implements IComponentEventHandler<ReactIncomingEvent> {
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
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render () {
    return (
      <>
        <h1>User form</h1>
        <UserForm onSubmit={this.saveUser} />
      </>
    )
  }

  /**
   * Save the user.
   * 
   * @param user - The user
   */
  private async saveUser (user: UserInput): Promise<void> {
    console.log('user saved', user)
    await this.userService.create(user)
  }
}