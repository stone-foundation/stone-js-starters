import { HttpResponse } from '@stone-js/http'
import { StoneApp } from '@stone-js/core/decorators'
import { NodeHttpAdapter } from '@stone-js/adapters/decorators'

@StoneApp()
@NodeHttpAdapter({ default: true })
export class Application {
  /**
   * Create an Application instance.
   *
   * @param {Container} container - Service container. For more details, see: https://www.npmjs.com/package/@stone-js/service-container.
   */
  constructor (container) {
    this.container = container
  }

  /**
   * OnInit Hook
   * Hook that runs once and only once when the application starts.
   * Useful for initialization and configuration tasks at startup.
   * 
   * @returns
   */
  static onInit () {
    console.log('I am executed once and for all!')
  }

  /**
   * BeforeHandle Hook
   * Hook that runs before each event and just before the action handler.
   * Useful for initialization and configuration that needs to be done before each event.
   * 
   * @returns
   */
  beforeHandle () {
    console.log('I am executed before each event!')
  }

  /**
   * Event Handler: The Main Entry Point for Your Application
   * Add your custom application logic here to process the event.
   * 
   * @param   {IncomingHttpEvent} event - Stone IncomingEvent. For more details, see: https://github.com/stonemjs/common/blob/main/src/IncomingEvent.mjs.
   * @returns {OutgoingHttpResponse} Stone OutgoingHttpResponse. For more details, see: https://github.com/stonemjs/http/blob/main/src/HttpResponse.mjs.
   */
  async handle (event) {
    console.log('I am here to handle events:', event.method, event.path)
    return HttpResponse.json({ message: 'Hello World' })
  }

  /**
   * Terminate Hook
   * This hook runs after each response has been sent to the user.
   * Add your custom logic here to handle cleanup and finalization tasks.
   * 
   * @returns
   */
  onTerminate () {
    console.log('I am executed after each response is sent!')
  }
}