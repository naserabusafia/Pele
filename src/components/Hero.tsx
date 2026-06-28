import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t, lang } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white"
        aria-hidden
      />
      <div className="absolute inset-y-0 end-0 w-2 bg-flag-stripe opacity-90" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-[var(--brand-green)]/10 blur-3xl" />
            <img
              src={logo}
              alt="Pele Academy logo"
              className="h-72 w-72 object-contain drop-shadow-xl md:h-96 md:w-96"
            />
          </div>
        </div>

        <div className={lang === "ar" ? "text-right" : "text-left"}>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            {lang === "ar" ? (
              <>
                أكاديمية بيليه <span className="text-[var(--brand-green)]">الألمانية</span>{" "}
                <span className="text-[var(--brand-red)]">الفلسطينية</span>
              </>
            ) : (
              <>
                Pele <span className="text-[var(--brand-green)]">German</span>{" "}
                <span className="text-[var(--brand-red)]">Palestinian</span> Academy
              </>
            )}
          </h1>
          <div className="mt-3 h-1 w-24 rounded-full bg-[var(--brand-gold)]" />
          <p className="mt-6 text-lg font-medium text-foreground/80">{t.brand.tagline}</p>
          <p className="mt-2 text-base text-muted-foreground">{t.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-green)] px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02]"
            >
              {t.hero.ctaPrimary}
            </Link>
            <a
              href="#sections"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--brand-green)] bg-white px-6 py-3 text-sm font-bold text-[var(--brand-green)] transition-colors hover:bg-[var(--brand-green)]/5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
