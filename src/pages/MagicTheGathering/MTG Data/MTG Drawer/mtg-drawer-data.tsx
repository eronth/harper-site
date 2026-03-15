

import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "MTG Drawer";

const drawerDecks: MtgDeck[] = [
  { /* Jumpstart Packs */
    id: 'jumpstart-packs',
    name: 'Jumpstart Packs',
    colors: ['R', 'W', 'G', 'U', 'B'],
    shortDescription: 'The various jumpstart packs I\'ve gotten.',
    longDescription: <></>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Simple Deck Boxes'
    },
    status: 'Good',
  },
  { /* Riveteers */
    name: 'Riveteers',
    id: 'riveteers',
    colors: ['B', 'R', 'G'],
    shortDescription: 'A New Capenna Riveteers deck for attack aggression.',
    longDescription: <>
      Attack aggressively, especially with high power creatures
      to best use Mr. Orfeo.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Mr. Orfeo, the Boulder', '1BRG',
      'https://scryfall.com/card/snc/320/mr-orfeo-the-boulder',
      'When you attack, double target creature\'s power'
    ),
    keyCards: [
      mtgCard(
        'The Dominion Bracelet', '2',
        'https://scryfall.com/card/eoe/239/the-dominion-bracelet'
      )
    ],
    owner: 'Nic',
    location: {
      deckbox: 'Riveteers Box',
    },
    status: 'Needs Improvement'
  },
  { /* Brokers */
    name: 'Brokers',
    id: 'brokers',
    colors: ['G', 'W', 'U'],
    shortDescription: 'A New Capenna Brokers for shields and counters.',
    longDescription: <>
      Use shields and counters to protect your creatures while you build up your board.
      Then use those creatures to attack with a big force.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Soul of Emancipation', '4GWU',
        'https://scryfall.com/card/snc/223/soul-of-emancipation'
      ),
      mtgCard(
        'Mysterious Limousine', '3WW',
        'https://scryfall.com/card/snc/22/mysterious-limousine'
      ),
      mtgCard(
        'Diciplined Duelist', 'GWU',
        'https://scryfall.com/card/snc/182/disciplined-duelist'
      ),
      mtgCard(
        'Witness Protection', 'U',
        'https://scryfall.com/card/fdn/168/witness-protection'
      ),
    ],
    owner: 'Nic',
    location: {
      deckbox: 'Brokers Box',
      sleeves: 'Custom Art Deco'
    },
    status: 'Needs Improvement'
  }
];

export default drawerDecks;
