import { FC } from "react";
import { Article } from "../../models/Article";
import { StoneLink } from "@stone-js/use-react";

/**
 * Article Item Options
 */
export interface ArticleItemOptions {
  article: Article;
}

/**
 * Article Item component.
 * 
 * @param options - The options to create the Article Item component.
 */
export const ArticleItem: FC<ArticleItemOptions> = ({ article }) => {
  return (
    <article>
      <h3>
        <StoneLink to={`/users/${article.id}`}>{article.title}</StoneLink>
      </h3>
      <p>
        <span>{article.author.name}</span>
        <span>{new Date(article.createdAt).toISOString()}</span>
      </p>
      <p>{article.content.substring(0, 64)}</p>
      <div>
        <StoneLink to={`/users/edit/${article.id}`}>Edit</StoneLink>
      </div>
    </article>
  );
};
