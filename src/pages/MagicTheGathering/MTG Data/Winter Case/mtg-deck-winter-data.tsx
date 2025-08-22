import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Speed Demon Winter Case";

const winterCaseDecks: MtgDeck[] = [
  { /* Shadow Ninjutsu */
    id: 'shadow-ninjutsu',
    name: 'Shadow Ninjutsu',
    colors: ['U', 'B'],
    shortDescription: 'Everyone has Ninjutsu!',
    longDescription: <>
      Give everyone Ninjutsu so I can do quickswap
      shenanigans. You never know what might be swapping in next.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Satoru Umezawa', '1UB',
      'https://scryfall.com/card/neo/234/satoru-umezawa',
      'Draw (one of three) on Ninjutsu and give everyone Ninjutsu.'
    ),
    keyCards: [
      mtgCard(
        'Dinrova Horror', '4UB',
        'https://scryfall.com/card/jmp/450/dinrova-horror'
      ),
      mtgCard(
        'Eddymurk Crab', '5UU',
        'https://scryfall.com/card/blb/48/eddymurk-crab'
      ),
      mtgCard(
        'Huskburster Swarm', '7B',
        'https://scryfall.com/card/blb/98/huskburster-swarm'
      ),
      mtgCard(
        'Rampaging Spiketail', '4BB',
        'https://scryfall.com/card/lci/116/rampaging-spiketail'
      ),
      mtgCard(
        'Overlord of the Floodpits', '3UU',
        'https://scryfall.com/card/dsk/68/overlord-of-the-floodpits'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Spectrum Prism Box'
    },
    status: 'Needs Improvement',
  },
  { /* +1/+1 Growth Counters */
    name: '+1/+1 Growth Counters',
    id: 'growth-counters',
    colors: ['G', 'W'],
    shortDescription: 'Deck focused on +1/+1 counters',
    longDescription: <>
      This deck leverages creatures and spells that place +1/+1 counters.
      The big get bigger.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Leinore, Autumn Sovereign', '2GW',
      'https://scryfall.com/card/mic/1/leinore-autumn-sovereign',
      'Grow creatures and Coven — draw.'
    ),
    keyCards: [
      mtgCard(
        'Mossborn Hydra', '2G',
        'https://scryfall.com/card/fdn/107/mossborn-hydra'
      ),
      mtgCard(
        'Predator Ooze', 'GGG',
        'https://scryfall.com/card/fdn/642/predator-ooze'
      ),
      mtgCard(
        'Gnarlid Colony', '1G',
        'https://scryfall.com/card/fdn/224/gnarlid-colony'
      ),
      mtgCard(
        'Forced Adaptation', 'G',
        'https://scryfall.com/card/rvr/140/forced-adaptation'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Planet Adagia Large Deckbox'
    },
    status: 'Needs Improvement',
  },
  { /* Miracle Worker */
    name: 'Miracle Worker',
    id: 'miracle-worker',
    colors: ['W', 'U', 'B'],
    shortDescription: 'Let\'s make some miracles.',
    longDescription: <>
      Use scry and surveil to set up your deck to cast some miracle cards. Powerful
      enchantments with cheaper miracle prices. Perfect to ramp up your board state.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Aminatou, Veil Piercer', '1WUB',
      'https://scryfall.com/card/dsc/1/aminatou-veil-piercer',
      'Set up your deck to miracle on demand.'
    ),
    keyCards: [
      mtgCard(
        'Shark Typhoon', '5U',
        'https://scryfall.com/card/dsc/127/shark-typhoon'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Miracle Worker Box'
    },
    status: 'Great',
  },
  { /* Counter Intelligence */
    name: 'Counter Intelligence',
    id: 'counter-intelligence',
    colors: ['W', 'U', 'B'],
    shortDescription: 'Create unreasonable numbers of counters.',
    longDescription: <>
      Using a variety of artifacts and creatures, create and manipulate 
      outrageous numbers of +1/+1  and charge counters. Use those counters
      to buff yourself up and constantly threaten your opponents.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Inspirit, Flagship Vessel', 'URW',
      'https://scryfall.com/card/eoc/2/inspirit-flagship-vessel',
      'Spacecraft that creates +1/+1 or charge counters, and at 8+ charge protects your other artifacts.'
    ),
    keyCards: [],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Counter Intelligence Box'
    },
    status: 'Great',
  },
  { /* Survivors */
    name: 'Survivors',
    id: 'survivors',
    colors: ['W', 'G'],
    shortDescription: 'Have heroes survive the combat phase and grow for it.',
    longDescription: <>
      This deck focuses on methods of getting my Survivors to make it through combat phase
      tapped, thus gaining various bonuses.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Veteran Survivor', 'W',
        'https://scryfall.com/card/dsk/40/veteran-survivor'
      ),
      mtgCard(
        'Reluctant Role Model', '1W',
        'https://scryfall.com/card/dsk/26/reluctant-role-model'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Eventide Ashlyn Box'
    },
    status: 'Needs Improvement',
  },
  { /* Glimmer of Hope */
    name: 'Glimmer of Hope',
    id: 'glimmer-of-hope',
    colors: ['W', 'U'],
    shortDescription: 'Create glimmers and small guys to hold the line.',
    longDescription: <>
      This deck focuses on creating a steady stream of small creatures and "glimmer" tokens
      to establish a defensive front. It leverages various artifacts and enchantments to
      enhance these creatures, making it difficult for opponents to break through.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Inquisitive Glimmer', 'WU',
        'https://scryfall.com/card/dsk/217/inquisitive-glimmer'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Eventide Ashlyn Box'
    },
    status: 'Needs Improvement',
  }
];

export default winterCaseDecks;
