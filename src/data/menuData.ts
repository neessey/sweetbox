import { MenuItem, CustomOption } from '../types';

export const OFFICIAL_NOTE = 'Tout supplément chocolat ou autre est facturé à 500 F';

export const MENU_ITEMS: MenuItem[] = [
  // NOS CRÊPES SUCRÉES
  {
    id: 'crepe-chocolat',
    name: 'Crêpes Chocolat',
    category: 'crepes_sucrees',
    price: 2000,
    description: 'Crêpe chaude faite maison, garnie d’une généreuse coulée de chocolat fondant.',
    image: '/assets/chocolat.png',
    popular: true,
    prepTimeMinutes: 8,
    ingredients: ['Pâte à crêpe artisanale', 'Chocolat fondant'],
    customizable: true,
  },
  {
    id: 'oreo-chocolat',
    name: 'Crêpes Oreo Chocolat',
    category: 'crepes_sucrees',
    price: 3000,
    description: 'Crêpe garnie de coulis de chocolat intense et d’éclats de biscuits Oreo croustillants.',
    image: '/assets/chocolat-oreo.png',
    popular: true,
    heartFavorite: true,
    prepTimeMinutes: 10,
    ingredients: ['Éclats d’Oreo', 'Chocolat fondant'],
    customizable: true,
  },

  {
    id: 'crepe-nature',
    name: 'Crêpes Nature',
    category: 'crepes_sucrees',
    price: 3000,
    description: 'Crêpe dorée pur beurre, moelleuse et parfumée à la vanille naturelle.',
    image: '/assets/nature.png',
    prepTimeMinutes: 8,
    ingredients: ['Pâte à crêpe pur beurre', 'Sucre vanillé'],
    customizable: true,
  },
  {
    id: 'crepe-speculos',
    name: 'Crêpes Spéculos',
    category: 'crepes_sucrees',
    price: 3000,
    description: 'Pâte de spéculoos onctueuse et éclats de spéculoos croustillants saupoudrés.',
    image: '/assets/speculos.png',
    popular: true,
    prepTimeMinutes: 10,
    ingredients: ['Pâte Spéculoos', 'Brisures Spéculoos'],
    customizable: true,
  },
{
  id: 'cerelac',
  name: 'Crêpes Cerelac',
  category: 'crepes_sucrees',
  price: 3000,
  description: 'Délicieuse crêpe au pur chocolat intense, généreusement garnie de Cerelac pour une texture fondante et un goût réconfortant.',
  image: '/assets/cerelac.png',
  heartFavorite: true,
  prepTimeMinutes: 10,
  ingredients: ['Pur chocolat noir & au lait', 'Cerelac'],
  customizable: true,
},
  {
    id: 'crepe-kinder',
    name: 'Crêpes Kinder',
    category: 'crepes_sucrees',
    price: 3000,
    description: 'Garnie de chocolat Kinder fondant et morceaux de barres Kinder au cœur au lait.',
    image: '/assets/kinder.png',
    popular: true,
    heartFavorite: true,
    prepTimeMinutes: 10,
    ingredients: ['Chocolat Kinder', 'Moelleux au lait'],
    customizable: true,
  },
  {
    id: 'multi-saveurs',
    name: 'Multi Saveurs',
    category: 'crepes_sucrees',
    price: 3000,
    description: 'La crêpe signature mixant plusieurs nappages : Kinder, Oreo, Spéculos & Chocolat.',
    image: '/assets/multi.png',
    popular: true,
    heartFavorite: true,
    isNew: true,
    prepTimeMinutes: 12,
    ingredients: ['Chocolat', 'Kinder', 'Oreo', 'Spéculos'],
    customizable: true,
  },

  // NOS CRÊPES SALÉES
 {
    id: 'viande-hachee-fromage',
    name: 'Crêpes Viande Hachée Fromage',
    category: 'crepes_salees',
    price: 3000,
    description: 'Viande hachée savoureuse cuisinée aux épices légères et généreuse dose de fromage fondant.',
    image: '/assets/viande.png',
    popular: true,
    prepTimeMinutes: 12,
    ingredients: ['Viande hachée épicée', 'Fromage fondant'],
  },
   {
    id: 'poulet-fromage',
    name: 'Crêpes Poulet Fromage',
    category: 'crepes_salees',
    price: 3500,
    description: 'Crêpe salée garnie d’effiloché de poulet assaisonné et de fromage fondant et filant.',
    image: '/assets/poulet.png',
    popular: true,
    heartFavorite: true,
    prepTimeMinutes: 12,
    ingredients: ['Poulet assaisonné', 'Fromage fondu', 'Herbes fraîches'],
  },
  

 
];

export const box_SIZES = [
  {
    id: 'duo' as const,
    name: 'Sweet box Duo (2 Crêpes au choix)',
    price: 6000,
    itemsCount: 2,
    description: 'Assortiment de 2 crêpes emballées dans notre coffret signature avec ruban.',
    icon: '📦',
  },
  {
    id: 'family' as const,
    name: 'Sweet box Family (4 Crêpes au choix)',
    price: 12000,
    itemsCount: 4,
    description: 'Le grand coffret gourmand idéal pour la famille et les amis.',
    icon: '🎁',
  },
  {
    id: 'party' as const,
    name: 'Sweet box Party (6 Crêpes au choix)',
    price: 18000,
    itemsCount: 6,
    description: 'Le coffret fête suprême avec plusieurs saveurs sucrées et salées.',
    icon: '✨',
  }
];

export const CUSTOM_BASES: CustomOption[] = [
  { id: 'base-crepe-sucree', name: 'Base Crêpe Sucrée', price: 0, category: 'base', icon: '🥞' },
  { id: 'base-crepe-salee', name: 'Base Crêpe Salée', price: 500, category: 'base', icon: '🌮' },
];

export const CUSTOM_CHOCOLATES: CustomOption[] = [
  { id: 'choc-fondant', name: 'Chocolat Fondant', price: 0, category: 'chocolate', icon: '🍫' },
  { id: 'choc-kinder', name: 'Nappage Kinder', price: 0, category: 'chocolate', icon: '🍫' },
  { id: 'choc-speculos', name: 'Nappage Spéculos', price: 0, category: 'chocolate', icon: '🍪' },
  { id: 'choc-suppl', name: 'Supplément Extra (+500 F)', price: 500, category: 'chocolate', icon: '✨' },
];

export const CUSTOM_TOPPINGS: CustomOption[] = [
  { id: 'top-oreo', name: 'Éclats Oreo', price: 0, category: 'topping', icon: '🍪' },
  { id: 'top-milo', name: 'Poudre Milo', price: 0, category: 'topping', icon: '🧋' },
  { id: 'top-fromage', name: 'Double Fromage (Salée)', price: 500, category: 'topping', icon: '🧀' },
  { id: 'top-poulet', name: 'Extra Poulet', price: 500, category: 'topping', icon: '🍗' },
];
