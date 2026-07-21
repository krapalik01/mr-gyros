import { Category, MenuItem } from "../types";

export const categories: Category[] = [
  { id: "all", title: "Все", slug: "all" },
  { id: "c2", title: "Гиро и Шаурма", slug: "gyros-shawarma" },
  { id: "c5", title: "Закуски", slug: "snacks" },
  { id: "c4", title: "Горячие блюда", slug: "hot-dishes" },
  { id: "c3", title: "Салаты", slug: "salads" },
  { id: "c1", title: "Завтраки", slug: "breakfasts" },
  { id: "c6", title: "Мангал", slug: "grill" },
  { id: "c7", title: "Кофе", slug: "coffee" },
  { id: "c8", title: "Чай", slug: "tea" },
  { id: "c9", title: "Холодные напитки", slug: "cold-drinks" },
];

export const menuItems: MenuItem[] = [
  // --- ГИРО И ШАУРМА (c2) ---
  {
    id: "m_g1", categoryId: "c2",
    title: "Гиро классический",
    description: "Пита, курица, огурец, помидор, фри, фир.соус",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_g2", categoryId: "c2",
    title: "Гиро острый",
    description: "Пита, курица, огурец, помидор, фри, фир.соус, халапеньо",
    price: 280, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_g3", categoryId: "c2",
    title: "Гиро сырный",
    description: "Пита, курица, огурец, помидор, фри, фир.соус, сырный соус",
    price: 280, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_g4", categoryId: "c2",
    title: "Гиро на тарелке",
    description: "Пита, курица, огурец, помидор, фри, фир.соус, сырный соус, халапеньо",
    price: 390, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_g5", categoryId: "c2",
    title: "Гиро бургер",
    description: "Две сочные говяжьи котлеты, помидор, крас.лук, фир.соус, лист салата, пита",
    price: 400, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s1", categoryId: "c2",
    title: "Шаурма от шефа",
    description: "Пита, курица, огурец, помидор, крас.лук, фир.соус, п.капуста",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s2", categoryId: "c2",
    title: "Шаурма в лаваше",
    description: "Лаваш, курица, огурец, помидор, крас.лук, фир.соус, п.капуста",
    price: 300, weight: "Большая", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s3", categoryId: "c2",
    title: "Шаурма ностальгия",
    description: "Лаваш, курица, огурец, помидор, крас.лук, кинза, майонез, кетчуп, картошка, п.капуста",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s4", categoryId: "c2",
    title: "Шаурма в тандыре",
    description: "Хлеб, курица, огурец, помидор, крас.лук, фир.соус",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s5", categoryId: "c2",
    title: "Шаурма в булке",
    description: "Булка, курица, помидор, огурец, крас.лук, фир.соус",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_s6", categoryId: "c2",
    title: "Шаурма в кляре",
    description: "Лаваш, помидор, огурец, крас.лук, фир.соус, сыр моцарелла, хлеб",
    price: 270, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- ЗАКУСКИ (c5) ---
  {
    id: "m_z1", categoryId: "c5",
    title: "Картофель фри",
    description: "Хрустящий картофель фри",
    price: 210, weight: "150 гр", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_z2", categoryId: "c5",
    title: "Картофель по-деревенски",
    description: "Картофельные дольки со специями",
    price: 230, weight: "150 гр", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_z3", categoryId: "c5",
    title: "Наггетсы",
    description: "Куриные наггетсы",
    price: 230, weight: "7 шт", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_z4", categoryId: "c5",
    title: "Сырные палочки",
    description: "Жареные палочки с тянущимся сыром",
    price: 250, weight: "7 шт", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- ГОРЯЧИЕ БЛЮДА (c4) ---
  {
    id: "m_h1", categoryId: "c4",
    title: "Суп дюшбара",
    description: "Сумах, сметана, зелень",
    price: 390, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_h2", categoryId: "c4",
    title: "Долма из виноградного листа",
    description: "Подается с домашним кефиром и зеленью",
    price: 430, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_h3", categoryId: "c4",
    title: "Тава-кебаб",
    description: "Говяжьи котлеты, яйца, зелень",
    price: 430, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_h4", categoryId: "c4",
    title: "Чечевичный крем-суп",
    description: "Густой и наваристый суп из чечевицы",
    price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- САЛАТЫ (c3) ---
  {
    id: "m_sa1", categoryId: "c3",
    title: "Цезарь с курицей",
    description: "Салат айсберг, курица, черри, соус цезарь, яйцо, пармезан, сухари",
    price: 390, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_sa2", categoryId: "c3",
    title: "Греческий",
    description: "Салат айсберг, помидор, огурец, оливки, сыр фета, перец, заправка",
    price: 370, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_sa3", categoryId: "c3",
    title: "По домашнему",
    description: "Помидор, огурец, крас.лук, фир.заправка, зелень",
    price: 270, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_sa4", categoryId: "c3",
    title: "Овощная нарезка",
    description: "Помидор, огурец, болгарский перец, сыр, зелень",
    price: 370, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- ЗАВТРАКИ (c1) ---
  {
    id: "m_b1", categoryId: "c1",
    title: "Глазунья",
    description: "Подается с чаем",
    price: 350, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_b2", categoryId: "c1",
    title: "Шак-шука",
    description: "Яйца, помидор, перец. Подается с чаем",
    price: 390, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_b3", categoryId: "c1",
    title: "Каша дня (овсяная)",
    description: "5 злаков. Подается с чаем",
    price: 370, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_b4", categoryId: "c1",
    title: "Бал-каймак",
    description: "Мед, масло. Подается с чаем",
    price: 370, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_b5", categoryId: "c1",
    title: "Легкий завтрак",
    description: "Сыр, масло. Подается с чаем",
    price: 300, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- МАНГАЛ (c6) ---
  {
    id: "m_mg1", categoryId: "c6",
    title: "Курица на углях",
    description: "Лаваш, соус, лук (Только на вынос)",
    price: 950, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- КОФЕ (c7) ---
  {
    id: "m_cf1", categoryId: "c7", title: "Эспрессо", description: "Классический эспрессо", price: 190, weight: "60 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf2", categoryId: "c7", title: "Американо", description: "Классический черный кофе", price: 190, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf3_std", categoryId: "c7", title: "Фильтр-кофе (Стандарт)", description: "Кофе капельного заваривания", price: 150, weight: "150 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf3_big", categoryId: "c7", title: "Фильтр-кофе (Большой)", description: "Кофе капельного заваривания", price: 200, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf4_std", categoryId: "c7", title: "Капучино (Стандарт)", description: "Эспрессо с взбитым молоком", price: 220, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf4_big", categoryId: "c7", title: "Капучино (Большой)", description: "Эспрессо с взбитым молоком", price: 290, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf5_std", categoryId: "c7", title: "Капучино на альт. молоке (Стандарт)", description: "На альтернативном молоке", price: 270, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf5_big", categoryId: "c7", title: "Капучино на альт. молоке (Большой)", description: "На альтернативном молоке", price: 330, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf6", categoryId: "c7", title: "Флэт уайт", description: "Насыщенный кофейный вкус", price: 250, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf7", categoryId: "c7", title: "Раф классика", description: "Нежный сливочный кофе", price: 300, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf8", categoryId: "c7", title: "Раф с урбечом", description: "Сливочный кофе с добавлением урбеча", price: 340, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf9_std", categoryId: "c7", title: "Латте (Стандарт)", description: "Много молока и легкая кофейная нотка", price: 220, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf9_big", categoryId: "c7", title: "Латте (Большой)", description: "Много молока и легкая кофейная нотка", price: 290, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf10", categoryId: "c7", title: "Горячий шоколад", description: "Густой шоколадный напиток", price: 180, weight: "100 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf11_std", categoryId: "c7", title: "Какао (Стандарт)", description: "Горячий какао на молоке", price: 200, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cf11_big", categoryId: "c7", title: "Какао (Большой)", description: "Горячий какао на молоке", price: 280, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- ЧАЙ (c8) ---
  {
    id: "m_t1", categoryId: "c8", title: "Ассам (черный)", description: "Классический черный чай", price: 230, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t2", categoryId: "c8", title: "Сенча (зеленый)", description: "Классический зеленый чай", price: 250, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t3", categoryId: "c8", title: "Жасмин", description: "Зеленый чай с жасмином", price: 270, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t4", categoryId: "c8", title: "Травяной", description: "Ароматный травяной сбор", price: 290, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t5", categoryId: "c8", title: "Заказ шефа", description: "Черный чай, чабрец, мята, лимон", price: 290, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t6", categoryId: "c8", title: "Марроканский чай", description: "Авторский чай", price: 330, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_t7", categoryId: "c8", title: "Облепиховый чай", description: "Авторский чай", price: 330, weight: "1 порц.", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },

  // --- ХОЛОДНЫЕ НАПИТКИ (c9) ---
  {
    id: "m_cd1_glass", categoryId: "c9", title: "Лимонад Щавелевый (Стакан)", description: "Освежающий щавелевый лимонад", price: 270, weight: "350 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd1_pitcher", categoryId: "c9", title: "Лимонад Щавелевый (Графин)", description: "Освежающий щавелевый лимонад", price: 450, weight: "1 л", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd2_glass", categoryId: "c9", title: "Лимонад Манго-маракуйя (Стакан)", description: "Тропический лимонад", price: 290, weight: "350 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd2_pitcher", categoryId: "c9", title: "Лимонад Манго-маракуйя (Графин)", description: "Тропический лимонад", price: 470, weight: "1 л", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd3_glass", categoryId: "c9", title: "Лимонад Мохито (Стакан)", description: "Классический мохито", price: 270, weight: "350 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd3_pitcher", categoryId: "c9", title: "Лимонад Мохито (Графин)", description: "Классический мохито", price: 450, weight: "1 л", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd4", categoryId: "c9", title: "Фреш Апельсиновый", description: "Свежевыжатый сок", price: 280, weight: "200 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd5", categoryId: "c9", title: "Смузи Ягодный", description: "Питательный ягодный смузи", price: 340, weight: "350 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd6", categoryId: "c9", title: "Молочный коктейль Классический", description: "Взбитое молоко с мороженым", price: 250, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd7", categoryId: "c9", title: "Айс кофе", description: "Охлажденный кофе", price: 300, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
  {
    id: "m_cd8", categoryId: "c9", title: "Бамбл апельсин", description: "Кофе с апельсиновым соком и карамелью", price: 330, weight: "300 мл", imageUrl: "/images/placeholder.jpg", isAvailable: true,
  },
];