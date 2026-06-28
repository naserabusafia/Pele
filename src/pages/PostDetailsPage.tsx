import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSection } from "@/data/sections";
import { usePost } from "@/hooks/usePost";
import { useI18n } from "@/i18n/I18nProvider";

export function PostDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { post, isLoading, error } = usePost(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        {lang === "ar" ? "جاري تحميل الخبر..." : "Loading post..."}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        {error && (
          <p className="mt-3 text-sm text-red-600">
            {lang === "ar" ? "تعذر تحميل الخبر من الخادم." : "Could not load the post from the API."}
          </p>
        )}
        <Link to="/news" className="mt-4 inline-block text-[var(--brand-green)]">
          {t.posts.back}
        </Link>
      </div>
    );
  }

  const section = getSection(post.sectionSlug);
  const Arrow = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-green)] hover:underline"
      >
        <Arrow className="h-4 w-4" />
        {t.posts.back}
      </button>

      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
        </span>
        {section && (
          <Link
            to={`/sections/${section.slug}`}
            className="rounded-full bg-[var(--brand-green)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-green)]"
          >
            {lang === "ar" ? section.titleAr : section.titleEn}
          </Link>
        )}
      </div>

      <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
        {lang === "ar" ? post.titleAr : post.titleEn}
      </h1>

      <div className="mt-6 overflow-hidden rounded-2xl shadow-soft">
        <img src={post.imageUrl} alt="" className="h-72 w-full object-cover md:h-[28rem]" />
      </div>

      <div className="mt-8 max-w-none text-base leading-relaxed text-foreground/85">
        {(lang === "ar" ? post.contentAr : post.contentEn).split("\n").map((paragraph) => (
          <p key={paragraph} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
