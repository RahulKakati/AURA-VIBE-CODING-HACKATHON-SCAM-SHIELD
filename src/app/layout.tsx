import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SCAMSHIELD AI | AI-Powered Suspicious Message & Phishing Detection Platform',
  description:
    'Detect fraudulent messages, UPI scams, fake bank alerts, KYC phishing, and deceptive URLs using multi-layer AI and heuristic threat intelligence. Built for PromptWars X Code1 Innovators.',
  keywords: [
    'ScamShield AI',
    'cybersecurity',
    'phishing detection',
    'UPI scam detection',
    'KYC fraud',
    'AI message scanner',
    'India cybercrime protection',
    'fake bank SMS'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-cyber-darkest text-slate-100 antialiased selection:bg-cyber-cyan selection:text-cyber-darkest">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
