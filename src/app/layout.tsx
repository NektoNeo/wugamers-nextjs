import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WU Gamers - Мир уникальных геймеров",
  description: "АНО «Уникальный мир» - развитие специального кибердвижения и фиджитал-спорта для людей с НЕограниченными возможностями",
  keywords: "киберспорт, инклюзивный спорт, фиджитал-спорт, WU Gamers, Уникальный мир",
  authors: [{ name: "WU Gamers" }],
  openGraph: {
    title: "WU Gamers - Мир уникальных геймеров",
    description: "Развитие специального кибердвижения и фиджитал-спорта для людей с НЕограниченными возможностями",
    url: "https://wugamers.ru",
    siteName: "WU Gamers",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WU Gamers - Мир уникальных геймеров",
    description: "Развитие специального кибердвижения и фиджитал-спорта",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
