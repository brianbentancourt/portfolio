
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// SEO Configuration
const siteUrl = 'https://brianbentancourt.com';
const siteName = 'Brian Bentancourt - Software Developer';
const siteDescription = 'Portfolio of Brian Bentancourt, a software developer specializing in web technologies and AI solutions.';
const twitterHandle = '@bbentancourt_'; // TODO: Replace with your Twitter handle or remove if not applicable

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | Brian Bentancourt`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl), // Essential for resolving relative image paths
  alternates: {
    canonical: '/',
    // Example for language alternates if you add them later
    // languages: {
    //   'en-US': '/en',
    //   'es-UY': '/es',
    // },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US', // Default locale, can be dynamic based on LanguageContext if needed for more advanced setup
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Assumes og-image.png is in /public
        width: 1200,
        height: 630,
        alt: `Portfolio of ${siteName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: twitterHandle, 
    images: [`${siteUrl}/og-image.png`], 
  },
  icons: {
    icon: '/icon.svg', 
    // apple: '/apple-touch-icon.png', 
  },
  robots: { 
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Optional: Add keywords if desired, though less impactful for SEO nowadays
  // keywords: ['software developer', 'Next.js', 'React', 'AI', 'portfolio', 'Brian Bentancourt'],
  // Optional: Verification for search consoles
  // verification: {
  //   google: 'your-google-site-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>

        {/* Google Analytics Scripts */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
