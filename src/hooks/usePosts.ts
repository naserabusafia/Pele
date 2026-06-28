import { useEffect, useState } from "react";
import { postsService } from "@/services/postsService";
import type { Post } from "@/types/Post";

type UsePostsOptions = {
  published?: boolean;
  sectionSlug?: string;
  limit?: number;
};

export function usePosts(options: UsePostsOptions = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await postsService.getPosts({
          published: options.published,
          sectionSlug: options.sectionSlug,
        });

        if (!ignore) {
          setPosts(options.limit ? result.slice(0, options.limit) : result);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load posts.");
          setPosts([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      ignore = true;
    };
  }, [options.limit, options.published, options.sectionSlug]);

  return {
    posts,
    isLoading,
    error,
  };
}
