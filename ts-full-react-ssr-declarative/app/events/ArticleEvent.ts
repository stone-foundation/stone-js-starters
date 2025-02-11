import { Event } from "@stone-js/core";
import { Article } from "../models/Article";

/**
 * Article Event
 */
export class ArticleEvent extends Event {
  /**
   * ARTICLE_CREATED Event name, fires after a article have been created.
   *
   * @event ArticleEvent#ARTICLE_CREATED
   */
  static ARTICLE_CREATED: string = 'article.created';
  
  constructor(public readonly article: Partial<Article>) {
    super({ type: ArticleEvent.ARTICLE_CREATED });
  }
}
