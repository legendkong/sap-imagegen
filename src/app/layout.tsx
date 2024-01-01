import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SAP Kick Off 2024',
  description: 'SAP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <link rel="icon" href="/SAPlogo.png" sizes="16x16" /> */}
        {children}
      </body>
    </html>
  );
}
