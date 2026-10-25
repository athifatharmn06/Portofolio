import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} Athif Adheel. All rights reserved.</p>
      <Analytics />
      <SpeedInsights />
    </footer>
  );
}
