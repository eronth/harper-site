import type { MtgDeck } from "../../../../../types/mtg-types";
import { mtgCard } from "../../../mtgHelperFunctions";

const caseName = "Lorwyn Eclipsed Prerelease Box";
const dragonShield = "Dragon Shield";

const lorwynEclipsedPrereleaseBoxDecks: MtgDeck[] = [
  { /* Angry Nature Noises */
    id: 'angry-nature-noises',
    name: 'Angry Nature Noises',
    colors: ['G', 'W', 'B'],
    shortDescription: 'Use Doran and similar cards to bring out the power of high toughness.',
    longDescription: <>Use Doran and similar cards to bring out the power of high toughness.</>,
    deckType: 'Commander',
    commander: mtgCard(
      'Doran, Besieged by Time', '1WBG',
      'https://scryfall.com/card/ecl/215/doran-besieged-by-time',
      'Make high toughness creatures cheaper, and give bonuses to creatures who have high power/toughness differentials.'
    ),
    keyCards: [
      mtgCard(
        'Doran, the Siege Tower', 'WBG',
        'https://scryfall.com/card/2x2/201/doran-the-siege-tower'
      ),
      mtgCard(
        'Indomitable Ancients', '2WW',
        'https://scryfall.com/card/tdc/121/indomitable-ancients'
      ),
      mtgCard(
        'Ancient Lumberknot', '2BG',
        'https://scryfall.com/card/vow/230/ancient-lumberknot'
      ),
      mtgCard(
        'Unstoppable Ash', '3G',
        'https://scryfall.com/card/mor/137/unstoppable-ash'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Tall Changling'
    },
    status: 'Needs Improvement'
  },
  { /* Queza Drawing */
    id: 'queza-drawing',
    name: 'Queza Drawing',
    colors: ['W', 'U', 'B'],
    shortDescription: 'A deck focused on drawing cards and causing pain.',
    longDescription: <>
      Use Queza, Augur of Agonies to draw cards and cause opponents to lose life.
      Use other cards to control the board and protect yourself.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Queza, Augur of Agonies', '1WUB',
      'https://scryfall.com/card/snc/326/queza-augur-of-agonies',
      'When you draw a card, each opponent loses 1 life and you gain 1 life.'
    ),
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Mint Matte '+dragonShield,
    },
    status: 'Needs Improvement',
  },
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
      deckbox: 'Ivory '+dragonShield
    },
    status: 'Good',
  }
];

export default lorwynEclipsedPrereleaseBoxDecks;
