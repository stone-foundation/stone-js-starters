import './CreateArticlePage.css';
import { ReactNode } from "react";
import { ILogger } from "@stone-js/core";
import { ArticleInput } from "../../../models/Article";
import { IComponentEventHandler } from "@stone-js/router";
import { ArticleService } from "../../../services/ArticleService";
import { IRouter, Page, ReactIncomingEvent } from "@stone-js/use-react";
import { ArticleForm } from '../../../components/ArticleForm/ArticleForm';

/**
 * Create Article Page options.
 */
export interface CreateArticlePageOptions {
  router: IRouter
  logger: ILogger
  articleService: ArticleService
}

/**
 * Create Article Page component.
 */
@Page('/articles/create')
export class CreateArticlePage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly router: IRouter
  private readonly logger: ILogger
  private readonly articleService: ArticleService

  /**
   * Create a new Article Page component.
   * 
   * @param options - The options to create the Article Page component.
   */
  constructor ({ router, logger, articleService }: CreateArticlePageOptions) {
    this.router = router
    this.logger = logger
    this.articleService = articleService
  }

  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render (): ReactNode {
    return (
      <>
        <h1>New Article</h1>
        <ArticleForm onSubmit={this.createArticle} />
      </>
    )
  }

  /**
   * Create the article.
   * 
   * @param article - The article to save.
   */
  private async createArticle (articleInput: ArticleInput): Promise<void> {
    try {
      const article = await this.articleService.create(articleInput)
      this.router.navigate(`/articles/${article.id}`)
    } catch (error: any) {
      this.logger.error(error.message, { error })
    }
  }
}
