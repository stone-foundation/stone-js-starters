import { Article } from "../../../models/Article";
import { IComponentEventHandler } from "@stone-js/router";
import { ArticleService } from "../../../services/ArticleService";
import { ArticleItem } from "../../../components/ArticleItem/ArticleItem";
import { Page, ReactIncomingEvent, RenderContext, StoneLink } from "@stone-js/use-react";

/**
 * Article Page options.
 */
export interface ArticlePageOptions {
  articleService: ArticleService
}

/**
 * List Article Page component.
 */
@Page('/articles')
export class ArticlePage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly articleService: ArticleService

  /**
   * Create a new List Article Page component.
   * 
   * @param options - The options to create the List Article Page component.
   */
  constructor ({ articleService }: ArticlePageOptions) {
    this.articleService = articleService
  }

  /**
   * Handle the incoming event.
   * 
   * @param event - The incoming event.
   * @returns List of articles.
   */
  async handle (event: ReactIncomingEvent): Promise<Article[]> {
    return await this.articleService.list(event.get<number>('limit', 10))
  }

  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ data: articles }: RenderContext<Article[]>) {
    return (
      <>
        <h1>
          <span>Articles</span>
          <StoneLink to="/articles/create">New Article</StoneLink>
        </h1>
        <div>
          {articles?.map(article => <ArticleItem key={article.id} article={article} />)}
        </div>
      </>
    )
  }
}