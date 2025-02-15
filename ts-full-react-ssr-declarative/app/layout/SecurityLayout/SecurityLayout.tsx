import './SecurityLayout.css';
import { ReactNode } from "react";
import { IComponentEventHandler } from "@stone-js/router";
import { PageLayout, ReactIncomingEvent, RenderLayoutContext, StoneOutlet } from "@stone-js/use-react";

/**
 * Security Layout component.
 */
@PageLayout({ name: 'security' })
export class SecurityLayout implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ children }: RenderLayoutContext<ReactNode>) {
    return (
      <div className="container">
        <header>
          <p>
            <img src="/assets/stonejs.png" alt="Stone.js Logo" />
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
