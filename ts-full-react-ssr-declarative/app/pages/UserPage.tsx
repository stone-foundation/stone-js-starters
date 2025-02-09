import { User } from "../models/User";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent, RenderContext, IRouter, StoneLink } from "@stone-js/use-react";

export interface UserPageOptions {
  router: IRouter
}

/**
 * User Page component.
 */
@Page('/users/:name?')
export class UserPage implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Handle the incoming event.
   * 
   * @param event - The incoming event.
   * @returns The event data.
   */
  handle (event: ReactIncomingEvent): Partial<User> {
    return { name: event.get<string>('name') }
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
        <h1>Hello {data?.name ?? 'World'}!</h1>
        <p>Stone.js Framework</p>
        <p><StoneLink to="/users/create">New User</StoneLink></p>
      </>
    )
  }
}