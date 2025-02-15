import './AppLayout.css'
import { ReactNode } from "react";
import { User } from "../../models/User";
import { IComponentEventHandler } from "@stone-js/router";
import { PageLayout, ReactIncomingEvent, RenderLayoutContext, StoneOutlet } from "@stone-js/use-react";

/**
 * App Layout component.
 */
@PageLayout({ name: 'default' })
export class AppLayout implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event, children }: RenderLayoutContext<ReactNode>) {
    const user = event.getUser<User>() ?? {} as User

    return (
      <div className="container">
        <header>
          <p>
            <img src="/assets/stonejs.png" alt="Stone.js Logo" />
          </p>
          <p>
            <span>
              <img src="/assets/stonejs.png" alt="Stone.js Logo" />
            </span>
            <span>
              <span>{user.name}</span>
              <span>{user.email}</span>
            </span>
          </p>
        </header>
        <main>
          <StoneOutlet>{children}</StoneOutlet>
        </main>
        <footer>&copy; 2025 Stone.js</footer>
      </div>
    )
  }
}
