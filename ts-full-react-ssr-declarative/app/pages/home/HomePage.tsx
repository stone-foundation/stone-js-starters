import { ReactNode } from "react";
import { IComponentEventHandler } from "@stone-js/router";
import { Page, ReactIncomingEvent, StoneLink } from "@stone-js/use-react";

/**
 * Home Page component.
 */
@Page('/')
export class HomePage implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render (): ReactNode {
    return (
      <div>
        <h1>Stone.js Blog Dashboard</h1>
        <p>Welcome to the Stone.js Blog Dashboard.</p>
        <div>
          <h2>Posts</h2>
          <p>View the latest posts from the Stone.js Blog.</p>
          <StoneLink to="/posts">View Posts</StoneLink>
        </div>
        <div>
          <h2>Users</h2>
          <p>View the latest users from the Stone.js Blog.</p>
          <StoneLink to="/users">View Users</StoneLink>
        </div>
        <div>
          <h2>Manage</h2>
          <p>Manage your profile</p>
          <StoneLink to="/manage">Manage</StoneLink>
        </div>
      </div>
    )
  }
}
