import { NotFoundError } from "@stone-js/http-core";

/**
 * User Not found Error
 */
export class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
  }
}