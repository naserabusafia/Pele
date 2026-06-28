import { PostCard } from "@/components/PostCard";
import { SectionTitle } from "@/components/SectionTitle";
import { usePosts } from "@/hooks/usePosts";
import { useI18n } from "@/i18n/I18nProvider";

export function NewsPage() {
  const { t, lang } = useI18n();
  const { posts, isLoading, error } = usePosts({ published: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle center>{t.posts.allNews}</SectionTitle>
      {isLoading ? (
        <p className="mt-10 text-center text-muted-foreground">
          {lang === "ar" ? "جاري تحميل الأخبار..." : "Loading posts..."}
        </p>
      ) : error ? (
        <p className="mt-10 text-center text-red-600">
          {lang === "ar" ? "تعذر تحميل الأخبار من الخادم." : "Could not load posts from the API."}
        </p>
      ) : posts.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">{t.posts.noPosts}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
