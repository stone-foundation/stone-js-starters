import { Article, ArticleInput } from "../models/Article"
import { ArticleEvent } from "../events/ArticleEvent"
import { ArticleClient } from "../clients/ArticleClient"
import { EventEmitter, IContainer, Service } from "@stone-js/core"
import { ArticleNotFoundError } from "../errors/ArticleNotFoundError"

/**
 * Article Service Options
*/
export interface ArticleServiceOptions {
  articleClient: ArticleClient
  eventEmitter: EventEmitter
}

/**
 * Article Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * And because the front-end class will be minified, we need to use alias to keep the class name.
*/
@Service({ alias: 'articleService' })
export class ArticleService {
  private readonly articleClient: ArticleClient
  private readonly eventEmitter: EventEmitter

  /**
   * Resolve route binding
   * 
   * @param key - The key of the binding
   * @param value - The value of the binding
   * @param container - The container
   */
  static async resolveRouteBinding(key: string, value: string, container: IContainer): Promise<Article | undefined> {
    const articleService = container.resolve<ArticleService>('articleService')
    return await articleService.find({ [key]: value })
  }

  /**
   * Create a new Article Service
  */
  constructor({ articleClient, eventEmitter }: ArticleServiceOptions) {
    this.articleClient = articleClient;
    this.eventEmitter = eventEmitter;
  }

  /**
   * List articles
   * 
   * @param limit - The limit of articles to list
   */
  async list (limit: number = 10): Promise<Article[]> {
    return await this.articleClient.list(limit)
  }

  /**
   * Find a article
   * 
   * @param conditions - The conditions to find the article
   * @returns The found article
   */
  async find (conditions: Record<string, any>): Promise<Article> {
    try {
      return await this.articleClient.find(conditions.id)
    } catch (error: any) {
      if (error.status === 404) {
        throw new ArticleNotFoundError(error.message)
      } else {
        throw error
      }
    }
  }

  /**
   * Create a article
   * 
   * @param article - The article to create
   */
  async create(article: ArticleInput): Promise<Article> {
    await this.eventEmitter.emit(new ArticleEvent(article))
    return await this.articleClient.create(article)
  }

  /**
   * Update a article
   * 
   * @param id - The id of the article to update
   * @param article - The article data to update
   */
  async update(id: number, article: ArticleInput): Promise<Article> {
    return await this.articleClient.update(id, article)
  }

  /**
   * Delete a article
   * 
   * @param id - The id of the article to delete
   */
  async delete(id: number): Promise<void> {
    await this.articleClient.delete(id)
  }
}
