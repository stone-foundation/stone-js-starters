import { RuntimeError } from "@stone-js/core";

/**
 * User Not found Error
 */
export class UserNotFoundError extends RuntimeError {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
  }
}
