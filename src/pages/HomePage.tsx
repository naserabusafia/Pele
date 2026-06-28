import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { SectionCard } from "@/components/SectionCard";
import { SectionTitle } from "@/components/SectionTitle";
import { usePosts } from "@/hooks/usePosts";
import { useI18n } from "@/i18n/I18nProvider";
import { sections } from "@/data/sections";

export function HomePage() {
  const { t, lang } = useI18n();
  const { posts, isLoading, error } = usePosts({ published: true, limit: 3 });

  return (
    <>
      <Hero />

      <section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle center>{t.about.title}</SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.summary}
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex rounded-lg bg-[var(--brand-green)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            {lang === "ar" ? "اقرأ المزيد" : "Learn more"}
          </Link>
        </div>
      </section>

      <section id="sections" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle center>{t.sections.title}</SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle center>{t.posts.latest}</SectionTitle>
        {isLoading ? (
          <p className="mt-8 text-center text-muted-foreground">
            {lang === "ar" ? "جاري تحميل الأخبار..." : "Loading posts..."}
          </p>
        ) : error ? (
          <p className="mt-8 text-center text-red-600">
            {lang === "ar" ? "تعذر تحميل الأخبار من الخادم." : "Could not load posts from the API."}
          </p>
        ) : posts.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">{t.posts.noPosts}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            to="/news"
            className="inline-flex rounded-lg border-2 border-[var(--brand-green)] px-6 py-2.5 text-sm font-bold text-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-white"
          >
            {t.nav.news}
          </Link>
        </div>
      </section>
    </>
  );
}
