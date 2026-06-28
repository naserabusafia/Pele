import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-20 bg-[var(--brand-black)] text-white">
      <div className="h-1 bg-flag-stripe" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 object-contain" />
            <div className="text-sm font-bold leading-tight">{t.brand.name}</div>
          </div>
          <p className="text-sm text-white/70">{t.footer.slogan}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-[var(--brand-gold)]">{t.footer.contact}</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t.contact.location}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 0598564030
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> mostafa.pele.sport@gmail.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-[var(--brand-gold)]">
            {t.footer.quickLinks}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-white/80 hover:text-white">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/80 hover:text-white">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link to="/sections" className="text-white/80 hover:text-white">
                {t.nav.sections}
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-white/80 hover:text-white">
                {t.nav.news}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 hover:text-white">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-[var(--brand-gold)]">{t.contact.followUs}</h4>
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--brand-green)]"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {t.brand.name} - {t.footer.rights}
      </div>
    </footer>
  );
}
