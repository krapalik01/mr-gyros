import type { MetadataRoute } from "next";

// PWA-манифест: «Добавить на экран Домой» открывает меню без адресной строки браузера
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mr. Gyros",
    short_name: "Mr. Gyros",
    description: "Меню кафе Mr. Gyros: гиро, шаурма, кофе и завтраки",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F7F5",
    theme_color: "#D91C1C",
    lang: "ru",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
