import { User } from "../../models/User";
import { UserForm } from "../../components/UserForm";
import { UserService } from "../../services/UserService";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Create Article Page component.
 */
@Page('/articles/create')
export class CreateArticlePage implements IComponentEventHandler<ReactIncomingEvent> {
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
        <UserForm handleSubmit={this.saveUser} />
      </>
    )
  }

  private saveUser (user: User) {
    console.log('user saved', user)
    this.userService.createUser({ user }).then(() => {
      console.log('user created')
    })
  }
}