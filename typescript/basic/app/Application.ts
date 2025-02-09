import { StoneApp, LifecycleEventHandler, IBlueprint } from '@stone-js/core'
import { BodyEventMiddleware, NodeHttpAdapter } from '@stone-js/node-http-adapter'
import { IncomingHttpEvent, jsonHttpResponse, OutgoingHttpResponse } from '@stone-js/http-core'

@StoneApp({ name: 'Stone.js Application' })
@NodeHttpAdapter({
  url: 'http://localhost:8080',
  middleware: [
    { priority: 5, pipe: BodyEventMiddleware },
  ],
})
export class Application implements LifecycleEventHandler<IncomingHttpEvent, OutgoingHttpResponse> {
  private readonly blueprint: IBlueprint

  constructor ({ blueprint }: { blueprint: IBlueprint }) {
    this.blueprint = blueprint
  }

  static onInit (blueprint: IBlueprint): void {
    console.log(blueprint.get<string>('stone.name'), 'I am executed once and for all!')
  }

  beforeHandle (): void {
    console.log(this.blueprint.get<string>('stone.name'), 'I am executed before each event!')
  }
  
  handle (event: IncomingHttpEvent): OutgoingHttpResponse {
    console.log('I am here to handle events:', event.method, event.path, event.get<string>('content-type'), event.body)
    return jsonHttpResponse({ message: 'Hello World!' })
  }

  onTerminate (): void {
    console.log(this.blueprint.get<string>('stone.name'), 'I am executed after each response is sent!')
  }
}