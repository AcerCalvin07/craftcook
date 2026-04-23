import type { Ingredient, IngredientCategory } from '@/types'

// ── Curated Ingredient Database ─────────────────────────
// Filipino-first, with common foreign staples.
// Names lowercase and, where possible, aligned with TheMealDB
// so foreign-dish ingredient matching still works.
export const INGREDIENTS: Ingredient[] = [
  // ── Meat ──────────────────────────────────────────────
  { id: 'chicken',        name: 'Chicken',         category: 'Meat' },
  { id: 'chicken thighs', name: 'Chicken Thighs',  category: 'Meat' },
  { id: 'pork',           name: 'Pork',            category: 'Meat' },
  { id: 'pork belly',     name: 'Pork Belly (Liempo)', category: 'Meat' },
  { id: 'ground pork',    name: 'Ground Pork',     category: 'Meat' },
  { id: 'pork ribs',      name: 'Pork Ribs',       category: 'Meat' },
  { id: 'beef',           name: 'Beef',            category: 'Meat' },
  { id: 'beef shank',     name: 'Beef Shank',      category: 'Meat' },
  { id: 'ground beef',    name: 'Ground Beef',     category: 'Meat' },
  { id: 'bacon',          name: 'Bacon',           category: 'Meat' },
  { id: 'hotdog',         name: 'Hotdog',          category: 'Meat' },
  { id: 'longganisa',     name: 'Longganisa',      category: 'Meat' },
  { id: 'tocino',         name: 'Tocino',          category: 'Meat' },

  // ── Seafood ───────────────────────────────────────────
  { id: 'shrimp',         name: 'Shrimp',          category: 'Seafood' },
  { id: 'squid',          name: 'Squid (Pusit)',   category: 'Seafood' },
  { id: 'tilapia',        name: 'Tilapia',         category: 'Seafood' },
  { id: 'bangus',         name: 'Bangus (Milkfish)', category: 'Seafood' },
  { id: 'galunggong',     name: 'Galunggong',      category: 'Seafood' },
  { id: 'tuna',           name: 'Tuna',            category: 'Seafood' },
  { id: 'dilis',          name: 'Dilis (Anchovies)', category: 'Seafood' },

  // ── Vegetables ────────────────────────────────────────
  { id: 'onion',          name: 'Onion (Sibuyas)', category: 'Vegetable' },
  { id: 'garlic',         name: 'Garlic (Bawang)', category: 'Vegetable' },
  { id: 'ginger',         name: 'Ginger (Luya)',   category: 'Vegetable' },
  { id: 'tomato',         name: 'Tomato (Kamatis)', category: 'Vegetable' },
  { id: 'potato',         name: 'Potato (Patatas)', category: 'Vegetable' },
  { id: 'carrot',         name: 'Carrot',          category: 'Vegetable' },
  { id: 'eggplant',       name: 'Eggplant (Talong)', category: 'Vegetable' },
  { id: 'okra',           name: 'Okra',            category: 'Vegetable' },
  { id: 'sitaw',          name: 'String Beans (Sitaw)', category: 'Vegetable' },
  { id: 'kangkong',       name: 'Water Spinach (Kangkong)', category: 'Vegetable' },
  { id: 'malunggay',      name: 'Moringa (Malunggay)', category: 'Vegetable' },
  { id: 'sayote',         name: 'Chayote (Sayote)', category: 'Vegetable' },
  { id: 'labanos',        name: 'Radish (Labanos)', category: 'Vegetable' },
  { id: 'upo',            name: 'Bottle Gourd (Upo)', category: 'Vegetable' },
  { id: 'ampalaya',       name: 'Bitter Gourd (Ampalaya)', category: 'Vegetable' },
  { id: 'kalabasa',       name: 'Squash (Kalabasa)', category: 'Vegetable' },
  { id: 'pechay',         name: 'Pechay (Bok Choy)', category: 'Vegetable' },
  { id: 'cabbage',        name: 'Cabbage (Repolyo)', category: 'Vegetable' },
  { id: 'scallions',      name: 'Green Onion',     category: 'Vegetable' },
  { id: 'chili pepper',   name: 'Siling Labuyo',   category: 'Vegetable' },
  { id: 'green pepper',   name: 'Siling Haba',     category: 'Vegetable' },
  { id: 'bell pepper',    name: 'Bell Pepper',     category: 'Vegetable' },
  { id: 'mushrooms',      name: 'Mushrooms',       category: 'Vegetable' },
  { id: 'tofu',           name: 'Tofu (Tokwa)',    category: 'Vegetable' },

  // ── Dairy & Eggs ──────────────────────────────────────
  { id: 'egg',            name: 'Egg (Itlog)',     category: 'Dairy' },
  { id: 'milk',           name: 'Milk',            category: 'Dairy' },
  { id: 'evaporated milk',name: 'Evaporated Milk', category: 'Dairy' },
  { id: 'condensed milk', name: 'Condensed Milk',  category: 'Dairy' },
  { id: 'butter',         name: 'Butter',          category: 'Dairy' },
  { id: 'cheese',         name: 'Cheese',          category: 'Dairy' },

  // ── Grains ────────────────────────────────────────────
  { id: 'rice',           name: 'Rice (Kanin)',    category: 'Grain' },
  { id: 'glutinous rice', name: 'Glutinous Rice (Malagkit)', category: 'Grain' },
  { id: 'flour',          name: 'Flour',           category: 'Grain' },
  { id: 'bread',          name: 'Bread',           category: 'Grain' },
  { id: 'breadcrumbs',    name: 'Breadcrumbs',     category: 'Grain' },
  { id: 'pasta',          name: 'Pasta',           category: 'Grain' },
  { id: 'spaghetti',      name: 'Spaghetti',       category: 'Grain' },
  { id: 'bihon',          name: 'Bihon (Rice Noodles)', category: 'Grain' },
  { id: 'canton',         name: 'Canton Noodles',  category: 'Grain' },
  { id: 'lumpia wrapper', name: 'Lumpia Wrapper',  category: 'Grain' },

  // ── Spices & Aromatics ────────────────────────────────
  { id: 'salt',           name: 'Salt (Asin)',     category: 'Spice' },
  { id: 'black pepper',   name: 'Black Pepper (Paminta)', category: 'Spice' },
  { id: 'bay leaf',       name: 'Bay Leaf (Laurel)', category: 'Spice' },
  { id: 'paprika',        name: 'Paprika',         category: 'Spice' },
  { id: 'annatto',        name: 'Annatto (Atsuete)', category: 'Spice' },
  { id: 'oregano',        name: 'Oregano',         category: 'Spice' },
  { id: 'parsley',        name: 'Parsley',         category: 'Spice' },

  // ── Sauces & Liquids ──────────────────────────────────
  { id: 'soy sauce',      name: 'Soy Sauce (Toyo)', category: 'Sauce' },
  { id: 'vinegar',        name: 'Vinegar (Suka)',  category: 'Sauce' },
  { id: 'fish sauce',     name: 'Fish Sauce (Patis)', category: 'Sauce' },
  { id: 'bagoong',        name: 'Shrimp Paste (Bagoong)', category: 'Sauce' },
  { id: 'oyster sauce',   name: 'Oyster Sauce',    category: 'Sauce' },
  { id: 'banana ketchup', name: 'Banana Ketchup',  category: 'Sauce' },
  { id: 'tomato sauce',   name: 'Tomato Sauce',    category: 'Sauce' },
  { id: 'tomato paste',   name: 'Tomato Paste',    category: 'Sauce' },
  { id: 'olive oil',      name: 'Olive Oil',       category: 'Sauce' },
  { id: 'vegetable oil',  name: 'Cooking Oil',     category: 'Sauce' },
  { id: 'coconut milk',   name: 'Coconut Milk (Gata)', category: 'Sauce' },
  { id: 'calamansi',      name: 'Calamansi',       category: 'Sauce' },

  // ── Other ─────────────────────────────────────────────
  { id: 'sugar',          name: 'Sugar',           category: 'Other' },
  { id: 'brown sugar',    name: 'Brown Sugar',     category: 'Other' },
  { id: 'chicken stock',  name: 'Chicken Stock',   category: 'Other' },
  { id: 'pork stock',     name: 'Pork Stock',      category: 'Other' },
  { id: 'water',          name: 'Water',           category: 'Other' },
  { id: 'peanuts',        name: 'Peanuts',         category: 'Other' },
  { id: 'peanut butter',  name: 'Peanut Butter',   category: 'Other' },
  { id: 'raisins',        name: 'Raisins',         category: 'Other' },
  { id: 'green peas',     name: 'Green Peas',      category: 'Other' },
  { id: 'tamarind',       name: 'Tamarind (Sampalok) Mix', category: 'Other' },
  { id: 'banana',         name: 'Saba Banana',     category: 'Other' },
  { id: 'lemon',          name: 'Lemon',           category: 'Other' },
]

// ── Category Config ─────────────────────────────────────
export const CATEGORIES: {
  key: IngredientCategory | 'All'
  label: string
  icon: string
}[] = [
  { key: 'All',       label: 'All',        icon: '🗺️' },
  { key: 'Meat',      label: 'Meat',       icon: '🥩' },
  { key: 'Seafood',   label: 'Seafood',    icon: '🐟' },
  { key: 'Vegetable', label: 'Veggies',    icon: '🥦' },
  { key: 'Dairy',     label: 'Dairy',      icon: '🧀' },
  { key: 'Grain',     label: 'Grains',     icon: '🌾' },
  { key: 'Spice',     label: 'Spices',     icon: '🌶️' },
  { key: 'Sauce',     label: 'Sauces',     icon: '🫙' },
  { key: 'Other',     label: 'Other',      icon: '🍋' },
]
