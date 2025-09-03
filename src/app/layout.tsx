import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cours de Yoga Paris  | Professeur de Yoga Devi",
  description: "Cours de yoga à Paris avec Devi. Professeur de yoga certifiée, séances adaptées à tous niveaux. Réservez votre cours dès aujourd'hui.",
  keywords: "cours de yoga Paris, professeur de yoga Paris, yoga débutants Paris, cours de yoga Vincennes, professeur de yoga Vincennes, yoga collectif Vincennes, yoga particulier, cours de yoga à domicile",
  authors: [{ name: "Devi Yoga" }],
  openGraph: {
    title: "Cours de Yoga Paris | Professeur de Yoga Devi",
    description: "Cours de yoga à Paris avec Devi. Professeur de yoga certifié, séances adaptées à tous niveaux.",
    type: "website",
    locale: "fr_FR",
    siteName: "Devi Yoga Paris",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cours de Yoga Paris | Professeur de Yoga Devi",
    description: "Cours de yoga à Paris avec Devi. Professeur de yoga certifié, séances adaptées à tous niveaux.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://deviyogaparis.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
