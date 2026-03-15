import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";


const justKindaOut: MtgDeck[] = [
  
  { /* Riveting Strike */
    id: 'riveting-strike',
    name: 'Riveting Strike',
    colors: ['B', 'R', 'G'],
    shortDescription: 'A deck that focuses on high-power creatures, with good first-strike.',
    longDescription: <>
      Get some high power creatures on the field and grant them first strike before using Mr. Orfeo
      to double their power, making the threat even bigger.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Mr. Orfeo, the Boulder', '2BG',
      'https://scryfall.com/card/snc/204/mr-orfeo-the-boulder'
    ),
    keyCards: [],
    owner: 'Nic',
    location: {
      case: 'Where did this go?',
      deckbox: 'Where is this hidding?',
      sleeves: 'Forged Planet',
    },
    status: 'Good',
  },
  
];

export default justKindaOut;
