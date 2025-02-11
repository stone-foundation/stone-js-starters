import { RuntimeError } from "@stone-js/core";

/**
 * Article Not found Error
 */
export class ArticleNotFoundError extends RuntimeError {
  constructor(message: string) {
    super(message)
    this.name = 'ArticleNotFoundError'
  }
}
