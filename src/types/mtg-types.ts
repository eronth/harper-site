export type MtgColor = 'W' | 'U' | 'B' | 'R' | 'G' | 'C'; // White, Blue, Black, Red, Green, Colorless

export type DeckType = 'Commander' | '60-Card';

export type Owner = 'Nic' | 'Leslie';

export type DeckStatus = 'Incomplete' | 'Needs Improvement' | 'Good' | 'Great';

export interface MtgCard {
  name: string;
  manaCost?: string;
  magicardsInfoUrl?: string;
}

export interface MtgDeck {
  id: string;
  name: string;
  colors: MtgColor[];
  shortDescription: string;
  longDescription: string;
  deckType: DeckType;
  commander?: MtgCard;
  keyCards?: MtgCard[];
  owner: Owner;
  location: {
    case?: string;
    deckbox: string;
  };
  status: DeckStatus;
  lastUpdated: string; // ISO date string
}
