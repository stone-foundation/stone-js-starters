import { Stone } from "@stone-js/core";
import { AxiosClient } from "./AxiosClient";
import { Article, ArticleInput } from "../models/Article";

/**
 * Article Client Options
*/
export interface ArticleClientOptions {
  httpClient: AxiosClient
}

/**
 * Article Client
 */
@Stone({ alias: 'articleClient' })
export class ArticleClient {
  private readonly path: string
  private readonly client: AxiosClient

  /**
   * Create a new Article Client
   * 
   * @param options - The options to create the Article Client.
   */
  constructor({ httpClient }: ArticleClientOptions) {
    this.client = httpClient
    this.path = '/articles'
  }

  /**
   * List articles
   * 
   * @param limit - The limit of articles to list
   * @returns The list of articles
   */
  async list(limit: number = 10): Promise<Article[]> {
    return await this.client.get<Article[]>(`${this.path}?limit=${limit}`)
  }

  /**
   * Find an article
   * 
   * @param id - The id of the article to find
   * @returns The found article
   */
  async find(id: number): Promise<Article> {
    return await this.client.get<Article>(`${this.path}/${id}`)
  }

  /**
   * Create an article
   * 
   * @param article - The article to create
   * @returns The created article
   */
  async create(article: ArticleInput) {
    return this.client.post(this.path, article)
  }

  /**
   * Update an article
   * 
   * @param id - The id of the article to update
   * @param article - The article to update
   * @returns The updated article
   */
  async update(id: number, article: ArticleInput) {
    return this.client.patch(`${this.path}/${id}`, article)
  }

  /**
   * Delete an article
   * 
   * @param id - The id of the article to delete
   */
  async delete(id: number) {
    return this.client.delete(`${this.path}/${id}`)
  }
}
