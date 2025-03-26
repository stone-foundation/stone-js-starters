import { IncomingHttpEvent } from '@stone-js/http-core'
import { Application, ResponseData } from '../app/Application'
import { FunctionalEventHandler, ILogger } from '@stone-js/core'

describe('Application', () => {
  let mockedLogger: ILogger
  let app: FunctionalEventHandler<IncomingHttpEvent, ResponseData>

  beforeEach(() => {
    mockedLogger = {
      info: vi.fn(),
    } as unknown as ILogger

    app = Application({ logger: mockedLogger })
  })

  it('should create an event handler instance', () => {
    // Assert
    expect(app).toBeTypeOf('function')
  })

  it('should handle incoming http events', async () => {
    // Arrange
    const event = { get: () => 'World' } as unknown as IncomingHttpEvent
    // Act
    const response = await app(event)
    // Assert
    expect(response.message).toBe('Hello World!')
    expect(mockedLogger.info).toHaveBeenCalledWith('Hello World!')
  })
})
