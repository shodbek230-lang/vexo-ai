import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vexo AI',
  description: 'AI platform for websites, Telegram bots, Android apps, databases and project generation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
