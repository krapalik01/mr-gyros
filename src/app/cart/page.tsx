import { loadMenu } from "@/lib/menuStorage";
import { CartPage } from "@/components/CartPage";

// Цены считаются по актуальному меню из хранилища
export const dynamic = "force-dynamic";

export default async function Cart() {
  const menu = await loadMenu();
  return <CartPage menuItems={menu.items} />;
}
