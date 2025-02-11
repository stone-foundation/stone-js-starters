import { ILogger, isNotEmpty } from "@stone-js/core";
import { IComponentEventHandler } from "@stone-js/router";
import { Article, ArticleInput } from "../../../models/Article";
import { ArticleService } from "../../../services/ArticleService";
import { ArticleForm } from "../../../components/ArticleForm/ArticleForm";
import { Page, ReactIncomingEvent, RenderContext, StoneLink } from "@stone-js/use-react";

/**
 * Update Article Page options.
 */
export interface UpdateArticlePageOptions {
  logger: ILogger
  articleService: ArticleService
}

/**
 * Update Article Page component.
 */
@Page('/articles/:article@id(\\d+)/edit', { bindings: { article: ArticleService } })
export class UpdateArticlePage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly logger: ILogger
  private readonly articleService: ArticleService

  /**
   * Create a new Article Page component.
   * 
   * @param options - The options to create the Article Page component.
   */
  constructor ({ logger, articleService }: UpdateArticlePageOptions) {
    this.logger = logger
    this.articleService = articleService
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: RenderContext<Article>) {
    const article = event.get<Article>('article')
    
    if (isNotEmpty<Article>(article)) {
      return (
        <>
          <h1>{article?.title}</h1>
          <ArticleForm
            article={article}
            onSubmit={this.updateArticle}
          />
          <StoneLink to={`/articles/${article.id}`}>Back</StoneLink>
        </>
      )
    }

    return (
      <article>
        <h1>Article not found</h1>
      </article>
    )
  }

  private async updateArticle (article: ArticleInput): Promise<void> {
    try {
      await this.articleService.update(article.id, article)
    } catch (error: any) {
      this.logger.error(error.message, { error })
    }
  }
}
