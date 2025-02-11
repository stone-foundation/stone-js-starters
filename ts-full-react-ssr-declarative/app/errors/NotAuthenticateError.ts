import { ErrorOptions, RuntimeError } from "@stone-js/core";

/**
 * Not Authenticate Error
 */
export class NotAuthenticateError extends RuntimeError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'NotAuthenticateError'
  }
}
