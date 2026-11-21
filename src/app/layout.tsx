import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ScamShield AI — Suspicious Message & Phishing Threat Detection',
  description:
    'Commercial-grade cybersecurity platform detecting smishing, UPI payment traps, KYC fraud, and phishing URLs using dual-engine AI and heuristic threat intelligence.',
  keywords: [
    'ScamShield AI',
    'cybersecurity',
    'phishing detection',
    'UPI scam detection',
    'KYC fraud',
    'AI message scanner',
    'India cybercrime protection',
    'smishing detection'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-surface-0 text-text-primary antialiased selection:bg-brand-blue selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
