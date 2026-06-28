import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import type { Post } from "@/types/Post";
import { useI18n } from "@/i18n/I18nProvider";

export function PostCard({ post }: { post: Post }) {
  const { t, lang } = useI18n();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={post.imageUrl}
          alt={lang === "ar" ? post.titleAr : post.titleEn}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <time>{new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</time>
        </div>
        <h3 className="text-base font-bold text-foreground">
          {lang === "ar" ? post.titleAr : post.titleEn}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
          {lang === "ar" ? post.excerptAr : post.excerptEn}
        </p>
        <Link
          to={`/posts/${post.id}`}
          className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--brand-green)] hover:underline"
        >
          {t.posts.readMore} →
        </Link>
      </div>
    </article>
  );
}
