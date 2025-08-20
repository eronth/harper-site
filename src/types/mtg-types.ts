import type React from "react";

export type MtgColor = 'W' | 'U' | 'B' | 'R' | 'G' | 'C'; // White, Blue, Black, Red, Green, Colorless

export type DeckType = 'Commander' | '60-Card';

export type Owner = 'Nic' | 'Leslie';

export type DeckStatus = 'Incomplete' | 'Needs Improvement' | 'Good' | 'Great';

export interface MtgCard {
  name: string;
  manaCost?: string;
  magicardsInfoUrl?: string;
  description?: string; // Short description of what the card does
}

export interface MtgDeck {
  id: string;
  name: string;
  colors: MtgColor[];
  shortDescription: string;
  longDescription: React.ReactNode;
  deckType: DeckType;
  commander?: MtgCard;
  alternateCommander?: MtgCard;
  keyCards?: MtgCard[];
  owner: Owner;
  location: {
    case?: string;
    deckbox?: string;
  };
  status: DeckStatus;
}
