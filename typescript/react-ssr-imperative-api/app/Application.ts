import { UserData } from './pages/Home'
import { Routing } from '@stone-js/router'
// import { Browser } from '@stone-js/browser-adapter'
import { NodeHttp } from '@stone-js/node-http-adapter'
import { IBlueprint, IProvider, StoneApp } from '@stone-js/core'
import { EventContext, UseReact, ReactIncomingEvent, ReactOutgoingResponse, defineComponent, RouteDefinition } from '@stone-js/use-react'

// @Browser()
@Routing()
@UseReact()
@StoneApp()
@NodeHttp({ current: true })
export class Application implements IProvider<ReactIncomingEvent, ReactOutgoingResponse> {
  /**
   * Hook that runs once and before everything else.
   */
  static onInit (blueprint: IBlueprint): void {
    blueprint.set('stone.router.definitions', this.routeDefinitions())
  }

  /**
   * The route definitions.
   */
  static routeDefinitions (): RouteDefinition[] {
    return [
      {
        path: '/:name?=Jonh Doe',
        component: defineComponent(() => import('./pages/Home').then(({ Home }) => Home), { lazy: true }),
        action: ({ event }: EventContext): UserData => ({ name: event.getParam<string>('name', 'Unknown') }),
      }
    ]
  }
}
