import { Link, useParams } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getSection } from "@/data/sections";
import { usePosts } from "@/hooks/usePosts";
import { useI18n } from "@/i18n/I18nProvider";

export function SectionPostsPage() {
  const { slug = "" } = useParams();
  const { t, lang } = useI18n();
  const section = getSection(slug);
  const { posts, isLoading, error } = usePosts({ published: true, sectionSlug: slug });

  if (!section) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <Link to="/" className="mt-4 inline-block text-[var(--brand-green)]">
          {t.posts.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle>{lang === "ar" ? section.titleAr : section.titleEn}</SectionTitle>
      <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
        {lang === "ar" ? section.descriptionAr : section.descriptionEn}
      </p>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">
          {lang === "ar" ? "جاري تحميل الأخبار..." : "Loading posts..."}
        </p>
      ) : error ? (
        <p className="mt-12 text-center text-red-600">
          {lang === "ar" ? "تعذر تحميل الأخبار من الخادم." : "Could not load posts from the API."}
        </p>
      ) : posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t.posts.noPosts}</p>
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
