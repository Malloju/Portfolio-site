import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malloju Vishwam | AI & ML Developer Portfolio",
  description: "Portfolio of Malloju Vishwam — Computer Science & AI/ML student at LPU, skilled in deep learning, full-stack development, and data science.",
  keywords: ["Malloju Vishwam", "AI ML developer", "portfolio", "React", "Python", "LPU"],
  authors: [{ name: "Malloju Vishwam" }],
  openGraph: {
    title: "Malloju Vishwam | Portfolio",
    description: "AI & ML engineer, full-stack developer, and problem solver",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
