import { loadMenu } from "@/lib/menuStorage";
import { MenuPage } from "@/components/MenuPage";

// Меню читается из хранилища на каждый запрос (с коротким кэшем в памяти),
// чтобы правки из админки появлялись без пересборки сайта
export const dynamic = "force-dynamic";

export default async function Home() {
  const menu = await loadMenu();
  return <MenuPage menu={menu} />;
}
