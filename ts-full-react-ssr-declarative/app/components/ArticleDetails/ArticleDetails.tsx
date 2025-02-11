import { FC } from "react";
import { IContainer } from "@stone-js/core";
import { formatDateTime } from "../../utils";
import { Article } from "../../models/Article";
import { CommentWidget } from "../CommentWidget/CommentWidget";
import { ReactIncomingEvent, StoneLink } from "@stone-js/use-react";

/**
 * Article details Options
 */
export interface ArticleDetailsOptions {
  article: Article
  container: IContainer
  event: ReactIncomingEvent
  onDelete: (article: Article) => Promise<void>
}

/**
 * Article details component.
 * 
 * @param options - The options to create the Article details component.
 */
export const ArticleDetails: FC<ArticleDetailsOptions> = ({ event, onDelete, article, container }) => {
  return (
    <article>
      <h1>{article.title}</h1>
      <p>
        <span>{article.author.name}</span>
        <span>{formatDateTime(article.createdAt)}</span>
      </p>
      <p>{article.content}</p>
      <div>
        <StoneLink to={`/users/edit/${article.id}`}>Edit</StoneLink>
        <button onClick={async () => await onDelete(article)}>Delete</button>
      </div>
      <CommentWidget event={event} container={container} article={article} />
    </article>
  );
};
