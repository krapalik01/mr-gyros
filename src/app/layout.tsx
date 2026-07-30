import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr. Gyros | Цифровое меню",
  description: "«Mr. Gyros — доставка и самовывоз вкусной еды. Настоящий гиро, хрустящая шаурма, кофе и завтраки. Актуальное меню, цены и новинки заведения.»",
  openGraph: {
    title: "Mr. Gyros | Вкусная еда здесь",
    description: "Официальное меню кафе Mr. Gyros. Гиро, шаурма, кофе и завтраки.",
    siteName: "Mr. Gyros",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
