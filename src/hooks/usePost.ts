import { useEffect, useState } from "react";
import { postsService } from "@/services/postsService";
import type { Post } from "@/types/Post";

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadPost() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await postsService.getPostById(id);

        if (!ignore) {
          setPost(result);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load post.");
          setPost(null);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    if (!id) {
      setPost(null);
      setIsLoading(false);
      setError("Post id is missing.");
      return;
    }

    void loadPost();

    return () => {
      ignore = true;
    };
  }, [id]);

  return {
    post,
    isLoading,
    error,
  };
}
