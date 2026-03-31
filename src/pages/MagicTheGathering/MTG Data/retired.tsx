import type { MtgDeck } from "../../../types/mtg-types";
import { mtgCard } from "../mtgHelperFunctions";

const caseName = "Retired";

const retiredDecks: MtgDeck[] = [
  { /* Figure of Destiny */
    id: 'figure-of-destiny',
    name: 'Figure of Destiny',
    colors: ['W', 'R'],
    shortDescription:'A red-white kithkin soldiers deck focused around levelling Figure of Destiny.',
    longDescription: <> </>,
    deckType: '60-Card',
    keyCards: [mtgCard('Figure of Destiny', '1(R/W)', '')],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Retired',
  },
];

export default retiredDecks;
