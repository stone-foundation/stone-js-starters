import { Application } from '../app/Application'
import { renderToString } from 'react-dom/server'
import { ILogger, IncomingEvent } from '@stone-js/core'

// We must mock decorators to lighten the test environment
vi.mock(import("@stone-js/core"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    StoneApp: vi.fn(() => vi.fn()),
  }
})

// We must mock decorators to lighten the test environment
vi.mock(import("@stone-js/browser-adapter"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Browser: vi.fn(() => vi.fn()),
  }
})

// We must mock decorators to lighten the test environment
vi.mock(import("@stone-js/use-react"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    UseReact: vi.fn(() => vi.fn()),
  }
})

describe('Application', () => {
  let app: Application
  let mockedLogger: ILogger

  beforeEach(() => {
    mockedLogger = {
      info: vi.fn(),
    } as unknown as ILogger

    app = new Application({ logger: mockedLogger })
  })

  it('should create an application instance', () => {
    // Assert
    expect(app).toBeInstanceOf(Application)
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