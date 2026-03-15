import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";
//import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Nicol Bolas Sunflower Box";
const dragonShield = "Dragon Shield";

const nicolBolasSunflowerDecks: MtgDeck[] = [
  { /* Classic Black-White 60-card */
    name: 'Classic Black-White',
    id: 'classic-black-white',
    colors: ['W', 'B'],
    shortDescription: 'A classic White-Black Eventide-era based deck.',
    longDescription: <>
      Control and life gain your way to victory with a semi-aggressive
      White-Black deck based.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Elenda, Saint of Dusk', '2WB',
        'https://scryfall.com/card/fdn/119/elenda-saint-of-dusk'
      ),
      // mtgCard(
      //   'Divinity of Pride', 'W/BW/BW/BW/BW/B',
      //   'https://scryfall.com/card/c13/228/divinity-of-pride'
      // ),
      mtgCard(
        'Deathbringer Liege', '2W/BW/BW/B',
        'https://scryfall.com/card/eve/85/deathbringer-liege'
      ),
      mtgCard(
        'Unmake', 'W/BW/BW/B',
        'https://scryfall.com/card/ddk/27/unmake'
      ),
      mtgCard(
        'Nightsky Mimic', '1W/B',
        'https://scryfall.com/card/eve/91/nightsky-mimic'
      ),
      mtgCard(
        'Edge of Divinity', 'W/B',
        'https://scryfall.com/card/eve/87/edge-of-the-divinity'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Custom Art Deco Dragon Shield Box',
    },
    status: 'Good'
  },
  { /* Classic Black-White Commander */
    name: 'Classic Black-White Commander',
    id: 'classic-black-white-commander',
    colors: ['W', 'B'],
    shortDescription: 'A classic White-Black lifegain commander deck.',
    longDescription: <>
      Control and life gain your way to victory with a semi-aggressive
      White-Black deck based around a commander that can gain you life and create tokens.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Elenda, Saint of Dusk', '2WB',
      'https://scryfall.com/card/fdn/119/elenda-saint-of-dusk'
    ),
    keyCards: [
      mtgCard(
        'Elenda, Saint of Dusk', '2WB',
        'https://scryfall.com/card/fdn/119/elenda-saint-of-dusk'
      ),
      mtgCard(
        'Deathbringer Liege', '2W/BW/BW/B',
        'https://scryfall.com/card/eve/85/deathbringer-liege'
      ),
      mtgCard(
        'Unmake', 'W/BW/BW/B',
        'https://scryfall.com/card/ddk/27/unmake'
      ),
      mtgCard(
        'Nightsky Mimic', '1W/B',
        'https://scryfall.com/card/eve/91/nightsky-mimic'
      ),
      mtgCard(
        'Edge of Divinity', 'W/B',
        'https://scryfall.com/card/eve/87/edge-of-the-divinity'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Custom Art Deco Dragon Shield Box',
    },
    status: 'Good'
  },
  { /* Lifebats */
    id: 'lifebats',
    name: 'Lifebats',
    colors: ['B', 'W'],
    shortDescription: 'A life manipulating bats tribal deck.',
    longDescription: <>
      Small flying critters designed to manipulate life totals up and down.
      Many will get buffs based on whether I gained and/or lost life that turn.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Zoraline, Cosmos Caller', '1WB',
        'https://scryfall.com/card/blb/242/zoraline-cosmos-caller'
      ),
      mtgCard(
        'Darkstar Augur', '2B',
        'https://scryfall.com/card/blb/90/darkstar-augur'
      ),
      mtgCard(
        'Essence Channeler', '1W',
        'https://scryfall.com/card/blb/12/essence-channeler'
      ),
      mtgCard(
        'Sinister Monolith', '3B',
        'https://scryfall.com/card/blb/113/sinister-monolith'
      ),
      mtgCard(
        'Lunar Convocation', 'WB',
        'https://scryfall.com/card/blb/366/lunar-convocation'
      ),
      mtgCard(
        'Chalice of Life', '3',
        'https://scryfall.com/card/inr/257/chalice-of-life',
        //inr-257-chalice-of-life.jpg
        //inr-257-chalice-of-death.jpg
      ),
      mtgCard(
        'Sorin, Vengeful Bloodlord', '2WB',
        'https://scryfall.com/card/war/217/sorin-vengeful-bloodlord'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Dragon Shield Starry Night',
      sleeves: 'Dragonified Starry Night',
      sleevesMaker: dragonShield
    },
    status: 'Needs Improvement',
  },
  { /* Leftover Sleeves */
    id: 'leftover-sleeves3',
    name: 'Leftover Sleeves3',
    colors: ['C'],
    shortDescription: 'Just some unused sleeves.',
    longDescription: <>
    </>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Fantasy Series Spaceship'
    },
    status: 'Good',
  },
  { /* Deepspace Exploration */
    id: 'deepspace-exploration',
    name: 'Deepspace Exploration',
    colors: ['U', 'B'],
    shortDescription: 'Run artifact creatures and infiltrators to explore the depths of the opponent\'s personal space.',
    longDescription: <>
      Run artifact creatures and infiltrators to explore the depths of the opponent's personal space.
    </>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Fantasy Series Spaceship'
    },
    status: 'Good',
  },
  { /* The Growing Army of Sedris */
    id: 'growing-army-of-sedris',
    name: 'The Growing Army of Sedris',
    colors: ['U', 'B', 'R'],
    shortDescription: 'A Sedris, the Traitor King commander deck that focuses on reanimation and graveyard recursion.',
    longDescription: <>
      A Sedris, the Traitor King commander deck that focuses on reanimation and graveyard recursion. Plenty of sacrifice
      or on-enters effects to get value out of the graveyard and keep the board state changing.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Sedris, the Traitor King', '2UBR',
      'https://scryfall.com/card/2x2/274/sedris-the-traitor-king'
    ),
    keyCards: [
      mtgCard(
        'Shapesharer', '1U',
        'https://scryfall.com/card/lrw/85/shapesharer'
      ),
      mtgCard(
        'Xu-Ifit, Osteroharmonist', '1BB',
        'https://scryfall.com/card/eoe/127/xu-ifit-osteoharmonist'
      ),
      mtgCard(
        'Coalstoke Gearhulk', '1BBRR',
        'https://scryfall.com/card/dft/198/coalstoke-gearhulk'
      ),
      mtgCard(
        'Undead Sprinter', 'BR',
        'https://scryfall.com/card/dsk/350/undead-sprinter'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Dragon Shield Blood Red'
    },
    status: 'Good',
  },
  { /* Empty Box */
    id: 'empty-box',
    name: 'Empty Turquoise Box',
    colors: ['C'],
    shortDescription: 'An empty box for now.',
    longDescription: <>
      This box is currently empty, but I have plans to fill it with a deck that I want to build in the future.
    </>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Dragon Shield Turquoise'
    },
    status: 'Good',
  }
];

export default nicolBolasSunflowerDecks;
