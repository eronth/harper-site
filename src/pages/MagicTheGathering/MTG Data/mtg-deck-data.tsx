import type { MtgDeck } from '../../../types/mtg-types';
import duskmournCaseDecks from './Duskmourn Case/mtg-deck-duskmourn-data';
import mahaCaseDecks from './Maha Case/mtg-deck-maha-data';
import nicolBolasSunflowerDecks from './Nicol Bolas Sunflower Box/mtg-deck-nicolbolassunflower-data';
import winterCaseDecks from './Winter Case/mtg-deck-winter-data';
import zendikarDecks from './Zendikar Box/mtg-deck-zendikar-data';

import justKindaOut from './Just Kinda Out/mtg-deck-out-data';


// Sample deck data - you can replace this with your actual decks
// const winterCase = "Speed Demon Winter Case";
// const mahaCase = "Maha Case";
// const duskmournCase = "Duskmourn Case";
const mtgDecks: MtgDeck[] = [
  ...duskmournCaseDecks,
  ...mahaCaseDecks,
  ...nicolBolasSunflowerDecks,
  ...winterCaseDecks,
  ...zendikarDecks,
  ...justKindaOut,
  // {
  //   id: 'aaaaa',
  //   name: 'AAAAAAA',
  //   colors: ['R', 'G', 'B'],
  //   shortDescription: 'This is a test deck',
  //   longDescription: 'A test deck for development purposes.',
  //   deckType: 'Commander',
  //   commander: {
  //     name: 'EDDELMEDDEL',
  //     manaCost: '11(R/W)(W/R)XXRY(P/U)(U/P)GG(P/G)OG1B13',
  //     magicardsInfoUrl: '',
  //     description: ''
  //   },
  //   keyCards: [],
  //   owner: 'Leslie',
  //   location: {
  //     case: 'Unknown',
  //     deckbox: 'Unknown',
  //   },
  //   status: 'Good'
  // }
];
// Sort alphabetically
const sortedMtgDecks: MtgDeck[] = mtgDecks
  .sort((a, b) => a.name.localeCompare(b.name))

export default sortedMtgDecks;
