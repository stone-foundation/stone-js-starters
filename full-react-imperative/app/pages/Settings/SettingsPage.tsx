import { JSX } from "react";
import { User } from "../../models/User";
import { SettingsForm } from "../../components/SettingsForm/SettingsForm";
import { IPage, ReactIncomingEvent, PageRenderContext, definePage } from "@stone-js/use-react";

/**
 * SettingsPage options.
 */
export interface UpdateUserPageOptions {}

/**
 * SettingsPage component.
 */
export const SettingsPage = ({}: {}): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext): JSX.Element {
    const user = event.get<User>('user') ?? {} as User

    return <SettingsForm />
  }
})

/**
 * SettingsPage Blueprint.
 */
export const SettingsPageBlueprint = definePage(SettingsPage, { path: '/settings', layout: 'settings' })
