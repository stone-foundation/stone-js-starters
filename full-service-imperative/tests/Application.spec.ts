import { IncomingHttpEvent } from '@stone-js/http-core'
import { appConfig, Application, ResponseType } from '../app/configurations/userConfigurations'
import { FunctionalEventHandler, IBlueprint, ILogger } from '@stone-js/core'

// We must mock decorators to lighten the test environment
vi.mock('@stone-js/core', async (importOriginal) => {
  const actual = await importOriginal() as any
  return {
    ...actual,
    stone: vi.fn(() => ({
      handle: vi.fn(),
      use: vi.fn().mockReturnThis(),
      configure: vi.fn().mockReturnThis(),
    })),
  }
})

describe('Application', () => {
  let mockedLogger: ILogger
  let mockedBlueprint: IBlueprint
  let app: FunctionalEventHandler<IncomingHttpEvent, ResponseType>

  beforeEach(() => {
    mockedLogger = {
      info: vi.fn(),
    } as unknown as ILogger

    mockedBlueprint = {
      set: vi.fn(),
      get: vi.fn(() => 'Stone.js Application'),
    } as unknown as IBlueprint

    app = Application({ logger: mockedLogger, blueprint: mockedBlueprint })
  })

  it('should create an event handler instance', () => {
    // Assert
    expect(app).toBeTypeOf('function')
  })

  it('should set app configuration', () => {
    // Act
    appConfig(mockedBlueprint)
    // Assert
    expect(mockedBlueprint.set).toHaveBeenCalledWith('stone.name', 'Stone.js Application')
  })

  it('should handle incoming http events', async () => {
    // Arrange
    const event = { method: 'GET', path: '/' } as unknown as IncomingHttpEvent
    // Act
    const response = await app(event)
    // Assert
    expect(response.message).toBe('Hello World!')
    expect(response.source).toBe('Stone.js Application')
    expect(mockedBlueprint.get).toHaveBeenCalledWith('stone.name', 'Stone.js')
    expect(mockedLogger.info).toHaveBeenCalledWith('I am here to handle events: GET /')
  })
})