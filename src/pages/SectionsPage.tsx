import { SectionCard } from "@/components/SectionCard";
import { SectionTitle } from "@/components/SectionTitle";
import { sections } from "@/data/sections";
import { useI18n } from "@/i18n/I18nProvider";

export function SectionsPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle center>{t.sections.title}</SectionTitle>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <SectionCard key={section.slug} section={section} />
        ))}
      </div>
    </div>
  );
}
