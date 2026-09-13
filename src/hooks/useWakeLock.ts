// src/hooks/useWakeLock.ts
import { useEffect, useRef } from "react";

export const useWakeLock = () => {
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        // Добавлена проверка на видимость страницы
        if ("wakeLock" in navigator && document.visibilityState === "visible") {
          wakeLock.current = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.warn("Wake Lock request failed:", err);
      }
    };

    // Пробуем запросить при монтировании
    requestWakeLock();

    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        // Если вернулись на вкладку - запрашиваем снова
        await requestWakeLock();
      } else if (wakeLock.current !== null) {
        // Если ушли с вкладки - отпускаем блокировку (браузер делает это и сам, но так надежнее)
        wakeLock.current.release().catch(console.warn);
        wakeLock.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (wakeLock.current !== null) {
        wakeLock.current.release().catch(console.warn);
        wakeLock.current = null;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
