import { ErrorOptions, RuntimeError } from "@stone-js/core";

/**
 * Unauthorized Error
 */
export class UnauthorizedError extends RuntimeError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'UnauthorizedError'
  }
}
