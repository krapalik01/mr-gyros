// src/hooks/useHasMounted.ts
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false на сервере и во время гидратации, true после монтирования в браузере.
 * Нужен там, где рендер зависит от localStorage (корзина), чтобы серверная
 * и клиентская разметка совпадали. Без setState внутри useEffect.
 */
export const useHasMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
