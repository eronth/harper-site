import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";


const justKindaOut: MtgDeck[] = [
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
  }, 
  { /* Classic Black-White */
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
      deckbox: 'Custom Art Deco Dragon Shield Box',
    },
    status: 'Good'
  }
];

export default justKindaOut;
