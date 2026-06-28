import aboutImg from "@/assets/logo.png";
import { SectionTitle } from "@/components/SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

export function AboutPage() {
  const { t } = useI18n();
  const paragraphs = t.about.body.split("\n\n");

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionTitle center>{t.about.title}</SectionTitle>
      <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/80">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mx-auto mt-12 w-full max-w-[180px] overflow-hidden rounded-3xl shadow-soft sm:max-w-xs md:max-w-sm">
        <img
          src={aboutImg}
          alt=""
          className="w-full bg-muted object-contain"
        />
      </div>
    </div>
  );
}
