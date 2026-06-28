import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Section } from "@/types/Section";
import { useI18n } from "@/i18n/I18nProvider";

export function SectionCard({ section }: { section: Section }) {
  const { t, lang } = useI18n();
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={section.imageUrl}
          alt={lang === "ar" ? section.titleAr : section.titleEn}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 text-center">
        <h3 className="text-xl font-extrabold text-foreground">
          {lang === "ar" ? section.titleAr : section.titleEn}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
          {lang === "ar" ? section.descriptionAr : section.descriptionEn}
        </p>

        <Link
          to={`/sections/${section.slug}`}
          className="mt-6 inline-flex items-center gap-1 self-center rounded-xl border border-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-green)] transition-colors hover:bg-[var(--brand-green)] hover:text-white"
        >
          {t.sections.viewPosts}
          <Chevron className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
