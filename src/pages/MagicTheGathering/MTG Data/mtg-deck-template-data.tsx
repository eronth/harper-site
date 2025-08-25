import type { MtgDeck } from "../../../types/mtg-types";
import { mtgCard } from "../mtgHelperFunctions";

const caseName = "Example Case";

const templateCase: MtgDeck[] = [
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
      )
    ],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Ygroth Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement', 
  },
  { /* Example Deck */
    name: 'Example Deck',
    id: 'example-deck',
    colors: ['R', 'G', 'C', 'W'],
    shortDescription: 'Deck to be an example.',
    longDescription: <>
      This is a placeholder deck used as an example in the codebase.
    </>,
    deckType: '60-Card', // Options: '60-Card', 'Commander'
    keyCards: [ 
      mtgCard(
        'Mossborn Hydra', '2G',
        'https://scryfall.com/card/fdn/107/mossborn-hydra'
      ),
      mtgCard(
        'Predator Ooze', 'GGG',
        'https://scryfall.com/card/fdn/642/predator-ooze'
      )
    ],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Planet Adagia Large Deckbox', // Rename this to the actual deckbox name
      sleeves: 'Red Swirls', // Optional field
      sleevesMaker: 'Dragon Shield' // Optional field. Honesly only put if you LIKE the sleeves, I think?
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement',
  }
];

export default templateCase;
