import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

const contactInfo = {
  phone: "0598564030",
  email: "mostafa.pele.sport@gmail.com",
};

export function ContactPage() {
  const { t, lang } = useI18n();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionTitle center>{t.contact.title}</SectionTitle>

      <div className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <InfoRow icon={MapPin} text={t.contact.location} />
          <InfoRow icon={Phone} text={contactInfo.phone} href={`tel:${contactInfo.phone}`} />
          <InfoRow icon={Mail} text={contactInfo.email} href={`mailto:${contactInfo.email}`} />
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col items-center">
          <h4 className="mb-3 text-sm font-bold text-center">{t.contact.followUs}</h4>
          <div className="flex justify-center gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-green)] text-white hover:opacity-90"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  text,
  href,
}: {
  icon: typeof MapPin;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:bg-muted/40">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="break-all font-medium text-foreground">{text}</span>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
