export type CategoryId = 'all' | 'crepes_sucrees' | 'crepes_salees' | 'supplements';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  heartFavorite?: boolean;
  isNew?: boolean;
  prepTimeMinutes?: number;
  ingredients: string[];
  customizable?: boolean;
}

export interface CustomOption {
  id: string;
  name: string;
  price: number;
  category: 'base' | 'chocolate' | 'topping' | 'extra';
  icon?: string;
}

export interface CustomboxSelection {
  sizeId: 'duo' | 'family' | 'party';
  sizeName: string;
  itemsCount: number;
  basePrice: number;
  selectedBases: string[];
  selectedChocolates: string[];
  selectedToppings: string[];
  specialNotes?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  details?: string;
  customboxConfig?: CustomboxSelection;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  neighborhood: string;
  instructions?: string;
}

export interface MascotMessage {
  text: string;
  emotion?: 'happy' | 'waving' | 'excited' | 'thinking';
  quickReply?: string;
}
