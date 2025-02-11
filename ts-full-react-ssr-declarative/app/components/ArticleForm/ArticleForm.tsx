import { FC, useRef } from 'react';
import { ArticleInput } from '../../models/Article';

/**
 * Article Form Options
 */
export interface ArticleFormOptions {
  article?: ArticleInput
  onSubmit: (article: ArticleInput) => Promise<void>
}

/**
 * Article Form component.
 * 
 * @param options - The options to create the Article Form component.
 */
export const ArticleForm: FC<ArticleFormOptions> = ({ article, onSubmit }) => {
  // Create a reference to the article
  const articleRef = useRef<ArticleInput>({
    id: article?.id ?? 0,
    title: article?.title ?? '',
    content: article?.content ?? ''
  });

  // Handle the form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(articleRef.current)
  }

  // Handle the field change
  const onChange = (field: keyof ArticleInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    articleRef.current[field] = event.target.value;
  };

  // Render the component
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title:</label>
      <input id='title' type='text' onChange={onChange('title')} defaultValue={articleRef.current.title} />
      
      <label htmlFor='content'>Content:</label>
      <input id='content' type='text' onChange={onChange('content')} defaultValue={articleRef.current.content} />
      
      <button type='submit'>Publish</button>
    </form>
  );
};
