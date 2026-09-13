import { Category, MenuItem } from "../types";

// Как редактировать меню:
// - цена и объём/вес берутся из печатного меню; weight указываем только когда он информативен
//   ("300 мл", "150 гр", "7 шт"), для обычной порции поле не пишем;
// - позиция с двумя размерами = две записи (Стандарт/Большой, Стакан/Графин);
// - isChefChoice: true - позиция попадает во вкладку «Выбор шефа» (без дублей);
// - isAvailable: false - карточка остаётся, но кнопка «Нет в наличии».

const PLACEHOLDER = "/images/placeholder.jpg";

export const categories: Category[] = [
  { id: "all", title: "Все", slug: "all" },
  { id: "chef", title: "Выбор шефа", slug: "chef-choice" },
  { id: "gyros", title: "Гиро", slug: "gyros" },
  { id: "shawarma", title: "Шаурма", slug: "shawarma" },
  { id: "snacks", title: "Закуски", slug: "snacks" },
  { id: "hot", title: "Горячие блюда", slug: "hot-dishes" },
  { id: "salads", title: "Салаты", slug: "salads" },
  { id: "breakfast", title: "Завтраки", slug: "breakfasts" },
  { id: "grill", title: "Мангал", slug: "grill" },
  { id: "coffee", title: "Кофе", slug: "coffee" },
  { id: "ice-coffee", title: "Айс кофе", slug: "ice-coffee" },
  { id: "milkshakes", title: "Молочные коктейли", slug: "milkshakes" },
  { id: "tea", title: "Чаи", slug: "tea" },
  { id: "smoothies", title: "Смузи и фреши", slug: "smoothies-fresh" },
  { id: "lemonades", title: "Лимонады", slug: "lemonades" },
];

export const menuItems: MenuItem[] = [
  // --- ГИРО ---
  {
    id: "gyro-classic", categoryId: "gyros",
    title: "Гиро классический",
    description: "Пита, курица, огурец, помидор, фри, фирменный соус",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "gyro-spicy", categoryId: "gyros",
    title: "Гиро острый",
    description: "Пита, курица, огурец, помидор, фри, фирменный соус, халапеньо",
    price: 280, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "gyro-cheese", categoryId: "gyros",
    title: "Гиро сырный",
    description: "Пита, курица, огурец, помидор, фри, фирменный соус, сырный соус",
    price: 280, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "gyro-cheese-spicy", categoryId: "gyros",
    title: "Гиро сырно-острый",
    description: "Пита, курица, огурец, помидор, фри, фирменный соус, сырный соус, халапеньо",
    price: 300, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "gyro-plate", categoryId: "gyros",
    title: "Гиро на тарелке",
    description: "Пита, курица, огурец, помидор, фри, фирменный соус, сырный соус, халапеньо",
    price: 390, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "gyro-burger", categoryId: "gyros",
    title: "Гиро бургер",
    description: "2 сочные говяжьи котлеты, помидор, красный лук, фирменный соус, лист салата, пита",
    price: 400, imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },

  // --- ШАУРМА ---
  {
    id: "shawarma-chef", categoryId: "shawarma",
    title: "Шаурма от шефа",
    description: "Пита, курица, огурец, помидор, красный лук, фирменный соус, пекинская капуста",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },
  {
    id: "shawarma-lavash-std", categoryId: "shawarma",
    title: "Шаурма в лаваше (Стандарт)",
    description: "Лаваш, курица, огурец, помидор, красный лук, фирменный соус, пекинская капуста",
    price: 200, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shawarma-lavash-big", categoryId: "shawarma",
    title: "Шаурма в лаваше (Большая)",
    description: "Лаваш, курица, огурец, помидор, красный лук, фирменный соус, пекинская капуста",
    price: 300, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shawarma-tandoor", categoryId: "shawarma",
    title: "Шаурма в тандыре + айран",
    description: "Тандырная лепёшка, курица, огурец, помидор, красный лук, фирменный соус, айран",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shawarma-bun", categoryId: "shawarma",
    title: "Шаурма в булке + айран",
    description: "Булка, курица, огурец, помидор, красный лук, фирменный соус, айран",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shawarma-nostalgia", categoryId: "shawarma",
    title: "Шаурма ностальгия",
    description: "Лаваш, курица, огурец, помидор, красный лук, кинза, майонез, кетчуп, картошка, пекинская капуста",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- ЗАКУСКИ ---
  {
    id: "snack-fries", categoryId: "snacks",
    title: "Картофель фри",
    description: "Хрустящий картофель фри",
    price: 210, weight: "150 гр", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "snack-country-potato", categoryId: "snacks",
    title: "Картофель по-деревенски",
    description: "Картофельные дольки со специями",
    price: 230, weight: "150 гр", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "snack-nuggets", categoryId: "snacks",
    title: "Наггетсы",
    description: "Куриные наггетсы",
    price: 230, weight: "7 шт", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "snack-cheese-sticks", categoryId: "snacks",
    title: "Сырные палочки",
    description: "Жареные палочки с тянущимся сыром",
    price: 250, weight: "7 шт", imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- ГОРЯЧИЕ БЛЮДА ---
  {
    id: "hot-dushbara", categoryId: "hot",
    title: "Суп дюшбара",
    description: "Сумах, сметана, зелень",
    price: 340, imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },
  {
    id: "hot-dolma", categoryId: "hot",
    title: "Долма из виноградного листа",
    description: "Подаётся с кефиром и зеленью",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },
  {
    id: "hot-tava-kebab", categoryId: "hot",
    title: "Тава-кебаб",
    description: "3 говяжьи котлеты, яйца, зелень",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "hot-lentil-soup", categoryId: "hot",
    title: "Чечевичный крем-суп",
    description: "Густой и наваристый суп из чечевицы",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- САЛАТЫ ---
  {
    id: "salad-caesar", categoryId: "salads",
    title: "Цезарь с курицей",
    description: "Лист салата, курица, помидор, соус цезарь, яйцо, пармезан, сухари",
    price: 390, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "salad-greek", categoryId: "salads",
    title: "Греческий",
    description: "Лист салата, помидор, огурец, оливки, сыр фета, болгарский перец, заправка",
    price: 370, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "salad-home", categoryId: "salads",
    title: "По-домашнему",
    description: "Помидор, огурец, красный лук, фирменная заправка, зелень",
    price: 270, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "salad-veg-plate", categoryId: "salads",
    title: "Овощная нарезка",
    description: "Помидор, огурец, болгарский перец, сыр, зелень",
    price: 370, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- ЗАВТРАКИ ---
  {
    id: "bf-fried-eggs", categoryId: "breakfast",
    title: "Глазунья",
    description: "3 яйца, хлеб, чай",
    price: 320, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "bf-shakshuka", categoryId: "breakfast",
    title: "Шак-шука",
    description: "Яйца, помидор, перец, хлеб, чай",
    price: 390, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "bf-porridge", categoryId: "breakfast",
    title: "Каша",
    description: "Хлеб, чай",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "bf-tava-kebab", categoryId: "breakfast",
    title: "Тава-кебаб (завтрак)",
    description: "Говяжьи котлеты, яйца, зелень, хлеб, чай",
    price: 430, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- МАНГАЛ ---
  {
    id: "grill-chicken", categoryId: "grill",
    title: "Курица на углях + кола 1 л",
    description: "Курица, лаваш, соус, лук, кола (только на вынос)",
    price: 950, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- КОФЕ ---
  {
    id: "coffee-espresso", categoryId: "coffee",
    title: "Эспрессо",
    description: "Классический эспрессо",
    price: 200, weight: "60 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-americano", categoryId: "coffee",
    title: "Американо",
    description: "Классический чёрный кофе",
    price: 200, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-filter-std", categoryId: "coffee",
    title: "Фильтр-кофе (Стандарт)",
    description: "Кофе капельного заваривания",
    price: 150, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-filter-big", categoryId: "coffee",
    title: "Фильтр-кофе (Большой)",
    description: "Кофе капельного заваривания",
    price: 200, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cappuccino-std", categoryId: "coffee",
    title: "Капучино (Стандарт)",
    description: "Эспрессо со взбитым молоком",
    price: 220, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cappuccino-big", categoryId: "coffee",
    title: "Капучино (Большой)",
    description: "Эспрессо со взбитым молоком",
    price: 290, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cappuccino-alt-std", categoryId: "coffee",
    title: "Капучино на альт. молоке (Стандарт)",
    description: "На альтернативном молоке",
    price: 270, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cappuccino-alt-big", categoryId: "coffee",
    title: "Капучино на альт. молоке (Большой)",
    description: "На альтернативном молоке",
    price: 330, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-flat-white", categoryId: "coffee",
    title: "Флэт уайт",
    description: "Насыщенный кофейный вкус",
    price: 250, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-raf", categoryId: "coffee",
    title: "Раф классика",
    description: "Нежный сливочный кофе",
    price: 300, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-raf-urbech", categoryId: "coffee",
    title: "Раф с урбечем",
    description: "Сливочный кофе с добавлением урбеча",
    price: 340, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },
  {
    id: "coffee-latte-std", categoryId: "coffee",
    title: "Латте (Стандарт)",
    description: "Много молока и лёгкая кофейная нотка",
    price: 220, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-latte-big", categoryId: "coffee",
    title: "Латте (Большой)",
    description: "Много молока и лёгкая кофейная нотка",
    price: 290, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-hot-chocolate", categoryId: "coffee",
    title: "Горячий шоколад",
    description: "Густой шоколадный напиток",
    price: 200, weight: "100 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cocoa-std", categoryId: "coffee",
    title: "Какао (Стандарт)",
    description: "Горячее какао на молоке",
    price: 200, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "coffee-cocoa-big", categoryId: "coffee",
    title: "Какао (Большой)",
    description: "Горячее какао на молоке",
    price: 280, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- АЙС КОФЕ ---
  {
    id: "ice-coffee", categoryId: "ice-coffee",
    title: "Айс кофе",
    description: "Охлаждённый кофе со льдом",
    price: 300, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-coffee-urbech", categoryId: "ice-coffee",
    title: "Айс кофе с урбечем",
    description: "Охлаждённый кофе с урбечем",
    price: 370, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-latte", categoryId: "ice-coffee",
    title: "Айс латте",
    description: "Холодный латте со льдом",
    price: 250, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-bumble-orange", categoryId: "ice-coffee",
    title: "Бамбл апельсин",
    description: "Эспрессо с апельсиновым соком и льдом",
    price: 330, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-bumble-passion", categoryId: "ice-coffee",
    title: "Бамбл маракуйя",
    description: "Эспрессо с маракуйей и льдом",
    price: 350, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-tonic-classic", categoryId: "ice-coffee",
    title: "Тоник классика",
    description: "Эспрессо с тоником и льдом",
    price: 280, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "ice-tonic-pomegranate", categoryId: "ice-coffee",
    title: "Тоник гранат",
    description: "Эспрессо с гранатовым тоником и льдом",
    price: 300, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- МОЛОЧНЫЕ КОКТЕЙЛИ ---
  {
    id: "shake-classic", categoryId: "milkshakes",
    title: "Молочный классический",
    description: "Взбитое молоко с мороженым",
    price: 250, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shake-banana", categoryId: "milkshakes",
    title: "Молочно-банановый",
    description: "Молочный коктейль с бананом",
    price: 270, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shake-chocolate", categoryId: "milkshakes",
    title: "Шоколадно-молочный",
    description: "Молочный коктейль с шоколадом",
    price: 270, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "shake-strawberry", categoryId: "milkshakes",
    title: "Молочно-клубничный",
    description: "Молочный коктейль с клубникой",
    price: 270, weight: "300 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- ЧАИ ---
  {
    id: "tea-assam", categoryId: "tea",
    title: "Ассам",
    description: "Классический чёрный чай",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-sencha", categoryId: "tea",
    title: "Сенча",
    description: "Классический зелёный чай",
    price: 250, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-herbal", categoryId: "tea",
    title: "Травяной",
    description: "Ароматный травяной сбор",
    price: 290, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-chef", categoryId: "tea",
    title: "Заказ шефа",
    description: "Чёрный чай, чабрец, мята, лимон",
    price: 320, imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },

  // Авторские чаи
  {
    id: "tea-moroccan", categoryId: "tea",
    title: "Марокканский",
    description: "Авторский чай",
    price: 330, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-sea-buckthorn", categoryId: "tea",
    title: "Облепиховый",
    description: "Авторский чай",
    price: 330, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-raspberry-ginger", categoryId: "tea",
    title: "Малина-имбирь",
    description: "Авторский чай",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-orange-grape", categoryId: "tea",
    title: "Апельсин-виноград",
    description: "Авторский чай",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-berry", categoryId: "tea",
    title: "Ягодный чай",
    description: "Авторский чай",
    price: 350, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // Добавки к чаю
  {
    id: "tea-add-jam", categoryId: "tea",
    title: "Варенье",
    description: "Добавка к чаю",
    price: 290, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-add-chocolate", categoryId: "tea",
    title: "Плитка шоколада",
    description: "Добавка к чаю",
    price: 230, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-add-thyme", categoryId: "tea",
    title: "Чабрец",
    description: "Добавка к чаю",
    price: 40, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-add-mint", categoryId: "tea",
    title: "Мята",
    description: "Добавка к чаю",
    price: 40, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-add-lemon", categoryId: "tea",
    title: "Лимон",
    description: "Добавка к чаю",
    price: 40, imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "tea-add-clove", categoryId: "tea",
    title: "Гвоздика",
    description: "Добавка к чаю",
    price: 40, imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- СМУЗИ И ФРЕШИ ---
  {
    id: "smoothie-berry", categoryId: "smoothies",
    title: "Смузи ягодный",
    description: "Питательный ягодный смузи",
    price: 340, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "smoothie-mango-raspberry", categoryId: "smoothies",
    title: "Смузи манго-малина",
    description: "Манго и малина",
    price: 360, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "smoothie-mango-banana", categoryId: "smoothies",
    title: "Смузи манго-банан",
    description: "Манго и банан",
    price: 360, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "smoothie-strawberry-banana", categoryId: "smoothies",
    title: "Смузи клубника-банан",
    description: "Клубника и банан",
    price: 360, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "smoothie-date", categoryId: "smoothies",
    title: "Смузи финиковый",
    description: "Сытный смузи с финиками",
    price: 360, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true, isChefChoice: true,
  },
  {
    id: "fresh-orange", categoryId: "smoothies",
    title: "Фреш апельсиновый",
    description: "Свежевыжатый апельсиновый сок",
    price: 300, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "fresh-carrot", categoryId: "smoothies",
    title: "Фреш морковный",
    description: "Свежевыжатый морковный сок",
    price: 300, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "fresh-apple", categoryId: "smoothies",
    title: "Фреш яблочный",
    description: "Свежевыжатый яблочный сок",
    price: 300, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "fresh-pomegranate", categoryId: "smoothies",
    title: "Фреш гранатовый",
    description: "Свежевыжатый гранатовый сок",
    price: 500, weight: "200 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },

  // --- ЛИМОНАДЫ (стакан 350 мл / графин 1 л) ---
  {
    id: "lemonade-sorrel-glass", categoryId: "lemonades",
    title: "Лимонад Щавелевый (Стакан)",
    description: "Освежающий щавелевый лимонад",
    price: 270, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-sorrel-pitcher", categoryId: "lemonades",
    title: "Лимонад Щавелевый (Графин)",
    description: "Освежающий щавелевый лимонад",
    price: 450, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-sorrel-apple-glass", categoryId: "lemonades",
    title: "Лимонад Щавель-яблоко (Стакан)",
    description: "Щавель и яблоко",
    price: 290, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-sorrel-apple-pitcher", categoryId: "lemonades",
    title: "Лимонад Щавель-яблоко (Графин)",
    description: "Щавель и яблоко",
    price: 470, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mango-passion-glass", categoryId: "lemonades",
    title: "Лимонад Манго-маракуйя (Стакан)",
    description: "Тропический лимонад",
    price: 290, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mango-passion-pitcher", categoryId: "lemonades",
    title: "Лимонад Манго-маракуйя (Графин)",
    description: "Тропический лимонад",
    price: 470, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-berry-glass", categoryId: "lemonades",
    title: "Лимонад Ягодный (Стакан)",
    description: "Ягодный лимонад",
    price: 290, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-berry-pitcher", categoryId: "lemonades",
    title: "Лимонад Ягодный (Графин)",
    description: "Ягодный лимонад",
    price: 470, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mojito-glass", categoryId: "lemonades",
    title: "Лимонад Мохито (Стакан)",
    description: "Классический безалкогольный мохито",
    price: 270, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mojito-pitcher", categoryId: "lemonades",
    title: "Лимонад Мохито (Графин)",
    description: "Классический безалкогольный мохито",
    price: 450, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mojito-strawberry-glass", categoryId: "lemonades",
    title: "Лимонад Мохито клубника (Стакан)",
    description: "Мохито с клубникой",
    price: 290, weight: "350 мл", imageUrl: PLACEHOLDER, isAvailable: true,
  },
  {
    id: "lemonade-mojito-strawberry-pitcher", categoryId: "lemonades",
    title: "Лимонад Мохито клубника (Графин)",
    description: "Мохито с клубникой",
    price: 470, weight: "1 л", imageUrl: PLACEHOLDER, isAvailable: true,
  },
];
