import { ReactNode } from "react";
import { IComponentEventHandler } from "@stone-js/router";
import { PageLayout, ReactIncomingEvent, RenderLayoutContext, StoneOutlet } from "@stone-js/use-react";

/**
 * User Error Page component.
 */
@PageLayout({ name: 'default' })
export class AppLayout implements IComponentEventHandler<ReactIncomingEvent> {
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ children }: RenderLayoutContext<ReactNode>) {
    return (
      <>
        <header>Stone.js</header>
        <main><StoneOutlet>{children}</StoneOutlet></main>
      </>
    )
  }
}
