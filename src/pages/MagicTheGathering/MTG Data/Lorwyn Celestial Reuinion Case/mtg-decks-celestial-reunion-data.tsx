import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Lorwyn Celestial Reunion Case";

const lorwynCelestialReunionDecks: MtgDeck[] = [
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
  { /* Space Captain Tannuk, Worlds Traveler */
    name: 'Space Captain Tannuk, Worlds Traveler',
    id: 'space-captain-tannuk',
    colors: ['G', 'R'],
    shortDescription: 'A fun, adventurous deck.',
    longDescription: <>
      A fun, adventurous deck with landfall.
    </>,
    deckType: 'Commander', // Options: '60-Card', 'Commander'
    commander: mtgCard(
      'Tannuk, Memorial Ensign', '1RG',
      'https://scryfall.com/card/snc/314/tannuk-the-explorer',
      'Landfall - Deal 1 damage to each opponent. On second Landfall, also draw.'
    ),
    keyCards: [
      mtgCard(
        'Lumbra, Bellow of the Woods', '4GG',
        'https://scryfall.com/card/blb/183/lumra-bellow-of-the-woods'
      ),
      mtgCard(
        'Biotech Specialist', 'RG',
        'https://scryfall.com/card/eoe/214/biotech-specialist'
      ),
      mtgCard(
        'Fungal Colossus', '6G',
        'https://scryfall.com/card/eoe/184/fungal-colossus'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Kaito Box',
      sleeves: 'World Forge',

    },
    status: 'Needs Improvement'
  },
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
];

export default lorwynCelestialReunionDecks;
