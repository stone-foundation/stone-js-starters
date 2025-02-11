import { ReactNode } from "react";
import { Article } from "../../../models/Article";
import { ILogger, isNotEmpty } from "@stone-js/core";
import { IComponentEventHandler } from "@stone-js/router";
import { ArticleService } from "../../../services/ArticleService";
import { ArticleDetails } from "../../../components/ArticleDetails/ArticleDetails";
import { IRouter, Page, ReactIncomingEvent, RenderContext } from "@stone-js/use-react";

/**
 * Show Article Page options.
 */
export interface ShowArticlePageOptions {
  router: IRouter
  logger: ILogger
  articleService: ArticleService
}

/**
 * Show Article Page component.
 */
@Page('/articles/:article@id(\\d+)', { bindings: { article: ArticleService } })
export class ShowArticlePage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly router: IRouter
  private readonly logger: ILogger
  private readonly articleService: ArticleService

  /**
   * Create a new Article Page component.
   * 
   * @param options - The options to create the Article Page component.
   */
  constructor ({ router, logger, articleService }: ShowArticlePageOptions) {
    this.router = router
    this.logger = logger
    this.articleService = articleService
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event, container }: RenderContext<Article>): ReactNode {
    // Get the resolved article
    const article = event.get<Article>('article')

    // Render the component
    return isNotEmpty<Article>(article)
      ? <ArticleDetails
          event={event}
          article={article}
          container={container}
          onDelete={this.deleteArticle}
        />
      : <article><h1>Article not found</h1></article>
  }

  /**
   * Delete the article.
   * 
   * @param article - The article to delete.
   */
  private async deleteArticle (article: Article): Promise<void> {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await this.articleService.delete(article.id)
        this.router.navigate('/articles')
      } catch (error: any) {
        this.logger.error(error.message, { error })
      }
    }
  }
}
