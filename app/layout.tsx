import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Regrowx - African Hair Care Wisdom Meets Modern Technology',
  description: 'Discover personalized hair care solutions rooted in traditional Ghanaian herbal wisdom, enhanced by AI technology for modern effectiveness.',
  keywords: 'African hair care, natural hair products, Ghanaian herbs, AI hair analysis, traditional remedies',
  authors: [{ name: 'Regrowx Team' }],
  openGraph: {
    title: 'Regrowx - African Hair Care Wisdom',
    description: 'Personalized natural hair care solutions powered by AI and traditional knowledge',
    type: 'website',
    url: '/',
    siteName: 'Regrowx',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Regrowx - African Hair Care Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regrowx - African Hair Care Wisdom',
    description: 'AI-powered hair analysis meets traditional Ghanaian herbal wisdom',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}