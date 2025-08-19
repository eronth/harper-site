import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Speed Demon Winter Case";


const winterCase: MtgDeck[] = [
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
  }
];

export default winterCase;
