import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher() {
  const { t, toggleLang } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span>{t.common.switchTo}</span>
    </button>
  );
}
