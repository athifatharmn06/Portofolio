import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">© {new Date().getFullYear()} Athif Fadheel Atharahman</p>
        <p className="eyebrow">Built with React, TypeScript &amp; Tailwind</p>
      </div>
      <Analytics />
      <SpeedInsights />
    </footer>
  );
}
