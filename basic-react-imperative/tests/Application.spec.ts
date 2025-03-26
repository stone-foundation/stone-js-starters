import { Application } from '../app/Application'
import { renderToString } from 'react-dom/server'
import { ILogger, IncomingEvent } from '@stone-js/core'

describe('Application', () => {
  let app: any
  let mockedLogger: ILogger

  beforeEach(() => {
    mockedLogger = {
      info: vi.fn(),
    } as unknown as ILogger

    app = Application({ logger: mockedLogger })
  })

  it('should create an application instance', () => {
    // Assert
    expect(app).toBeInstanceOf(Object)
  })

  it('should handle incoming events', () => {
    // Arrange
    const expectedMessage = 'Hello World!'
    const event = { get: () => 'World' } as unknown as IncomingEvent

    // Act
    const response = app.handle(event) as { message: string }

    // Assert
    expect(response.message).toBe(expectedMessage)
    expect(mockedLogger.info).toHaveBeenCalledWith(expectedMessage)
  })

  it('should render component', () => {
    // Arrange
    const message = 'Hello World!'

    // Act
    const response = renderToString(app.render({ data: { message } } as any))

    // Assert
    expect(response).toMatchSnapshot()
  })
})