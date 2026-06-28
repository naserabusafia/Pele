import type { ReactNode } from "react";

export function SectionTitle({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
      <div
        className={`mt-3 h-1 w-20 rounded-full bg-[var(--brand-gold)] ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}
