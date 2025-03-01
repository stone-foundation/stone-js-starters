import './ErrorLayout.css';
import { ReactNode } from "react";
import { IComponentEventHandler } from "@stone-js/router";
import { PageLayout, ReactIncomingEvent, RenderLayoutContext, StoneOutlet } from "@stone-js/use-react";

/**
 * Error Layout component.
 */
@PageLayout({ name: 'error' })
export class ErrorLayout implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ children }: RenderLayoutContext<ReactNode>) {
    return (
      <>
        <header className="mt-64">
          <div className="container">
            <p className="pa-24">
              <img src="/assets/img/logo.png" className="logo" alt="Stone.js Logo" />
            </p>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="panel">
              <StoneOutlet>{children}</StoneOutlet>
            </div>
          </div>
        </main>
        <footer className='mt-24'>
          <div className="container">
            <p className="px-24 text-muted">2025 Stone.js &copy; Noowow Labs</p>
          </div>
        </footer>
      </>
    )
  }
}
