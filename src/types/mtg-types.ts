import type React from "react";

// White, Blue, Black, Red, Green, Colorless
export const mtgColors = ['W', 'U', 'B', 'R', 'G', 'C'] as const;
export type MtgColor = typeof mtgColors[number];

export type DeckType = 'Commander' | '60-Card';

export type Owner = 'Nic' | 'Leslie';

export const deckStatuses = ['Incomplete', 'Testing', 'Needs Improvement', 'Good', 'Great', 'Retired'] as const;
export type DeckStatus = typeof deckStatuses[number];

export interface MtgCard {
  name: string;
  manaCost?: string;
  magicardsInfoUrl?: string;
  description?: string; // Short description of what the card does
}

type DeckPlayedDate = {
  date: Date;
  playCount?: number; // how many times did the deck get played on this date
  location?: string;
  notes?: string;
}

export interface MtgDeck {
  id: string;
  name: string;
  keyterms?: string[];
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
    sleeves?: string;
    sleevesMaker?: string;
  };
  status: DeckStatus;
  datesPlayed?: DeckPlayedDate[]; // Optional field to track when the deck was played
}
