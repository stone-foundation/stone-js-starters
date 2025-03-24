import { Application } from '../app/Application'
import { IBlueprint, ILogger } from '@stone-js/core'
import { IncomingHttpEvent } from '@stone-js/http-core'

// We must mock decorators to lighten the test environment
vi.mock('@stone-js/core', (importOriginal) => ({
  ...importOriginal(),
  StoneApp: vi.fn(() => vi.fn()),
}))

// We must mock decorators to lighten the test environment
vi.mock('@stone-js/node-http-adapter', (importOriginal) => ({
  ...importOriginal(),
  NodeHttp: vi.fn(() => vi.fn()),
}))


describe('Application', () => {
  let app: Application
  let mockedLogger: ILogger
  let mockedBlueprint: IBlueprint

  beforeEach(() => {
    mockedLogger = {
      info: vi.fn(),
    } as unknown as ILogger

    mockedBlueprint = {
      get: vi.fn(() => 'Stone.js Application'),
    } as unknown as IBlueprint

    app = new Application({ logger: mockedLogger, blueprint: mockedBlueprint })
  })

  it('should create an application instance', () => {
    // Assert
    expect(app).toBeInstanceOf(Application)
  })

  it('should handle incoming http events', () => {
    // Arrange
    const event = { method: 'GET', path: '/' } as unknown as IncomingHttpEvent
    // Act
    const response = app.handle(event)
    // Assert
    expect(response.message).toBe('Hello World!')
    expect(response.source).toBe('Stone.js Application')
    expect(mockedBlueprint.get).toHaveBeenCalledWith('stone.name', 'Stone.js')
    expect(mockedLogger.info).toHaveBeenCalledWith('I am here to handle events: GET /')
  })
})