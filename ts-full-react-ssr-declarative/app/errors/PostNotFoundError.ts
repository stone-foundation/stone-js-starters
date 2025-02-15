import { RuntimeError } from "@stone-js/core";

/**
 * Post Not found Error
 */
export class PostNotFoundError extends RuntimeError {
  constructor(message: string) {
    super(message)
    this.name = 'PostNotFoundError'
  }
}
