import { useState } from "react";
import { User } from "../models/User";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Create User Page component.
 */
@Page('/users/create')
export class CreateUserPage implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render () {
    const [user, setUser] = useState<User>({} as any)

    return (
      <>
        <h1>User form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Your name:</label>
          <input id="name" type="text" onInput={(v) => setUser({ ...user, name: (v.target as any).value })} value={user.name} />
          <label htmlFor="email">Your email:</label>
          <input id="email" type="text" onInput={(v) => setUser({ ...user, email: (v.target as any).value })} value={user.email} />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }

  private handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Submit')
  }
}