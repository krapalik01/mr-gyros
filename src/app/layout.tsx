import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr. Gyros | Цифровое меню",
  description: "«Mr. Gyros — доставка и самовывоз вкусной еды. Настоящий гиро, хрустящая шаурма, кофе и завтраки. Актуальное меню, цены и новинки заведения.»",
  applicationName: "Mr. Gyros",
  openGraph: {
    title: "Mr. Gyros | Вкусная еда здесь",
    description: "Официальное меню кафе Mr. Gyros. Гиро, шаурма, кофе и завтраки.",
    siteName: "Mr. Gyros",
    locale: "ru_RU",
    type: "website",
  },
  // iOS: «На экран Домой» открывает меню как приложение, без адресной строки
  appleWebApp: {
    capable: true,
    title: "Mr. Gyros",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#D91C1C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
