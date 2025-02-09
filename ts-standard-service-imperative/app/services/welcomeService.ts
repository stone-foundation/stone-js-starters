import { FactoryService, ILogger } from "@stone-js/core"

/**
 * Welcome Service Options
*/
export interface WelcomeServiceOptions {
  logger: ILogger
}

/**
 * Interface for the Welcome Service
*/
export interface WelcomeService {
  welcome(name: string): { message: string }
}

/**
 * Welcome Service
*/
export const welcomeService: FactoryService = ({ logger }: WelcomeServiceOptions): WelcomeService => ({
  welcome(name: string): { message: string } {
    logger.info(`Welcome ${name}`)
    return { message: `Hello ${name}!` }
  }
})
