export interface TarotCardData {
  name: string;
  number: number;
  reversed?: boolean;
  meaning?: string;
}

export interface TarotDeckAttributes {
  mode?: 'pick' | 'reveal';
  cardCount?: number;
  spread?: 'three-card' | 'celtic-cross' | 'single';
  cards?: TarotCardData[];
}
