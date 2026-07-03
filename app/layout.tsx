import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mupu's Travel - Weekend Escapes from Bengaluru",
  description: 'Curated weekend escapes to misty forests and spice gardens — small groups, real adventures, every weekend from Bengaluru.',
  keywords: ['travel', 'Bengaluru', 'Karnataka', 'weekend trips', 'Coorg', 'Western Ghats'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-brand-bg">
        {children}
      </body>
    </html>
  );
}
