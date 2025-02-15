import { StoneApp } from '@stone-js/core/decorators'
import { RouterProvider } from '@stone-js/router/decorators'
import { NodeHttpAdapter } from '@stone-js/node-adapter/decorators'

@StoneApp()
@RouterProvider()
@NodeHttpAdapter({ default: true })
export class Application {
  /**
   * OnStart Hook
   * Hook that runs once and only once when the application starts.
   * Useful for initialization and configuration tasks at startup.
   * 
   * At this time, the service container has not been initialized yet.
   * 
   * @returns
   */
  static onStart () {
    console.log('I am executed once and for all!')
  }

  /**
   * BeforeHandle Hook
   * Hook that runs before each event and just before the action handler.
   * Useful for initialization and configuration that needs to be done before each event.
   * 
   * At this time, the service container has already been initialized.
   * 
   * @returns
   */
  beforeHandle () {
    console.log('I am executed before each event!')
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