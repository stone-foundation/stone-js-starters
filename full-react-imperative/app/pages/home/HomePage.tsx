import { User } from "../../models/User";
import { ILogger } from "@stone-js/core";
import { JSX, useEffect, useRef } from "react";
import PullToRefresh from 'react-pull-to-refresh'
import { PostInput, Post } from "../../models/Post";
import { PostService } from "../../services/PostService";
import { PostCard } from "../../components/PostCard/PostCard";
import { CommentService } from "../../services/CommentService";
import { HomePostForm } from "../../components/HomePostForm/HomePostForm";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import { CommentWidget } from "../../components/CommentWidget/CommentWidget";
import { IPage, ReactIncomingEvent, HeadContext, definePage, IRouter, PageRenderContext } from "@stone-js/use-react";

/**
 * HomePage options.
 */
export interface HomePageOptions {
  router: IRouter
  logger: ILogger
  postService: PostService
  commentService: CommentService
}

/**
 * Home Page.
 */
export const HomePage = ({ router, logger, postService, commentService }: HomePageOptions): IPage<ReactIncomingEvent> => ({
  head (): HeadContext {
    return {
      title: 'Home',
      description: 'Welcome to the Stone.js timeline'
    }
  },

  /**
   * Handle the incoming event.
   * 
   * @param event - The incoming event.
   * @returns List of posts.
   */
  async handle (event: ReactIncomingEvent): Promise<Post[]> {
    return await postService.list(event.get<number>('limit', 10))
  },

  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render ({ data: posts, event }: PageRenderContext<Post[]>): JSX.Element {
    const limit = useRef(10)
    const isLoading = useRef(false)
    const loadMoreRef = useRef(null)
    const handleRefresh = async () => {
      posts = await postService.list(event.get<number>('limit', limit.current))
    }

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            limit.current += 10
            postService
              .list(event.get<number>('limit', limit.current))
              .then(newPosts => {
                posts = [...posts ?? [], ...newPosts]
                if (newPosts.length < 10) {
                  if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
                }
              })
              .catch(error => {
                console.error('Error loading more posts:', error)
                logger.error(error.message, { error })
              })
          }
        },
        { threshold: 1 }
      )

      if (loadMoreRef.current) observer.observe(loadMoreRef.current)

      return () => {
        if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
      }
    }, [loadMoreRef.current])

    return (
      <>
        <section>
          <HomePostForm onSubmit={createPost.bind(this, router, logger, postService)} />
        </section>
        <section>
          {posts?.length === 0 && <p>No posts found.</p>}
          {isLoading.current
            ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
            : <>
              <PullToRefresh onRefresh={handleRefresh}>
                {posts?.map(post =>
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={event.getUser<User>()}
                    onEdit={() => router.navigate(`/posts/${post.id}/edit`)}
                    onDelete={deletePost.bind(this, router, logger, postService, post)}
                  >
                    <CommentWidget post={post} currentUser={event.getUser<User>()!} commentService={commentService} />
                  </PostCard>
                )}
              </PullToRefresh>
              <div ref={loadMoreRef} style={{ height: '1px' }} />
            </>
          }
        </section>
      </>
    )
  }
})

/**
 * Create the post.
 * 
 * @param post - The post to save.
 */
export async function createPost (
  router: IRouter,
  logger: ILogger,
  postService: PostService,
  postInput: PostInput
): Promise<void> {
  try {
    const post = await postService.create(postInput)
    router.navigate(`/posts/${post.id}`)
  } catch (error: any) {
    console.error(error)
    window.alert('Error creating the post')
    logger.error(error.message, { error })
  }
}

/**
 * Delete the post.
 * 
 * @param post - The post to delete.
 */
export async function deletePost (
  router: IRouter,
  logger: ILogger,
  postService: PostService,
  post: Post
): Promise<void> {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await postService.delete(post.id)
      router.navigate('/posts')
    } catch (error: any) {
      window.alert('Error deleting the post')
      logger.error(error.message, { error })
    }
  }
}

/**
 * Home Page Blueprint.
 */
export const HomePageBlueprint = definePage(HomePage, { path: '/' })
