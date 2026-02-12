export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  rarity: Rarity;
  description?: string;
  slot: number;
}

export interface InventoryGridAttributes {
  columns?: number;
  slots?: number;
  items?: InventoryItem[];
  actions?: string[];
}
