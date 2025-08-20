import type { MtgDeck } from "../../../../types/mtg-types";
//import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Nicol Bolas Sunflower Box";

const nicolBolasSunflowerDecks: MtgDeck[] = [
  { /* Leftover Sleeves */
    id: 'leftover-sleeves',
    name: 'Leftover Sleeves',
    colors: ['C'],
    shortDescription: 'Just some unused sleeves.',
    longDescription: <>
    </>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Ivory Dragon Shield'
    },
    status: 'Good',
  }
];

export default nicolBolasSunflowerDecks;
