import { JSX } from "react";
import { IPage, ReactIncomingEvent, StoneLink, HeadContext, definePage } from "@stone-js/use-react";

/**
 * Home Page.
 */
export const HomePage = (): IPage<ReactIncomingEvent> => ({
  head (): HeadContext {
    return {
      title: 'Home',
      description: 'Welcome to the Stone.js Blog Dashboard'
    }
  },

  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render (): JSX.Element {
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
})

/**
 * Home Page Blueprint.
 */
export const HomePageBlueprint = definePage(HomePage, { path: '/' })
