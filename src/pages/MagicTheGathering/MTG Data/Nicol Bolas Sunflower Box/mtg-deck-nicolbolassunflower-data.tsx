import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";
//import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Nicol Bolas Sunflower Box";
const dragonShield = "Dragon Shield";

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
  },
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
      case: caseName,
      sleeves: 'Forged Planet',
    },
    status: 'Good',
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
  }
];

export default nicolBolasSunflowerDecks;
