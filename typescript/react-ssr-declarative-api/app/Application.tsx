import { StoneApp } from '@stone-js/core'
import { Routing } from '@stone-js/router'
import { Browser } from '@stone-js/browser-adapter'
// import { NodeHttp } from '@stone-js/node-http-adapter'
import { EventContext, Page, UseReact, IPageComponent, RenderContext } from '@stone-js/use-react'

interface UserData {
  name: string
}

@Browser()
@Routing()
@UseReact()
@StoneApp()
@Page('/:name?=Jonh Doe')
export class Application implements IPageComponent<UserData> {
  /**
   * Handle the incoming event.
   */
  handle ({ params }: EventContext): UserData {
    return { name: params.name as string }
  }

  /**
   * Render the component.
   */
  render ({ data }: RenderContext<UserData>) {
    return <h1>Hello {data?.name}!</h1>
  }
}
