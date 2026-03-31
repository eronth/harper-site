import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Chronicle of Victory Mini-Case";

const chronicleOfVictoryDecks: MtgDeck[] = [
  { /* Giant Thrashers */
    id: 'giant-thrashers',
    name: 'Giant Thrashers',
    colors: ['W', 'R'],
    shortDescription: 'An aggressive RW Giants deck using, primarily, Lorwyn (classic and eclipsed) giants to bring mighty blows.',
    longDescription: <>
      Get out giants and giant support to maintaing a constant threat. Then, when the time is right,
      drop extremely powerful giants and finish your foes.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Bre of Clan Stoutarm', '2RW',
        'https://scryfall.com/card/ecl/207/bre-of-clan-stoutarm'
      ),
      mtgCard(
        'Brion Stoutarm', '2RW',
        'https://scryfall.com/card/a25/200/brion-stoutarm'
      ),
      mtgCard(
        'Stinkdrinker Daredevil', '2R',
        'https://scryfall.com/card/cm2/119/stinkdrinker-daredevil'
      ),
      mtgCard(
        'Boldwyr Aggressor', '3RR',
        'https://scryfall.com/card/ecl/125/boldwyr-aggressor'
      ),
      mtgCard(
        'Boldwyr Heavyweights', '2RR',
        'https://scryfall.com/card/mor/85/boldwyr-heavyweights'
      ),
      mtgCard(
        'Borderland Behemoth', '5RR',
        'https://scryfall.com/card/cm2/87/borderland-behemoth'
      )
    ],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'
  },
  { /* Unnamed Merrow */
    id: 'unnamed-merrow',
    name: 'Unnamed Merrow',
    colors: ['U', 'W'],
    shortDescription: '???',
    longDescription: <></>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'
  },
  { /* Ankle Blighters */
    id: 'ankle-blighters',
    name: 'Ankle Blighters',
    colors: ['B', 'R'],
    shortDescription: 'A goblin blight deck, with rude attacks and damage.',
    longDescription: <>
      Build up a goblin army that blights for various advantages. Blight your own
      for the benefit of the whole, and bring them back with your Aunties.
    </>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'
  },
  { /* Juggling Spells */
    id: 'juggling-spells',
    name: 'Juggling Spells',
    colors: ['U', 'R'],
    shortDescription: 'A deck based on cards comeing in and out of play.',
    longDescription: <></>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'
  },
  { /* Redblue Mix Spells */
    id: 'redblue-mix-spells',
    name: 'Redblue Mix Spells',
    colors: ['U', 'R'],
    shortDescription: 'A deck comprised of cards that are red+blue.',
    longDescription: <></>,
    deckType: '60-Card',
    keyCards: [],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'
  },
  { /* Generational Kithking Home */
    id: 'generational-kithking-home',
    name: 'Generational Kithking Home',
    colors: ['G', 'W', 'U'],
    shortDescription: 'New and old Kithkin alike.',
    longDescription: <></>,
    deckType: 'Commander',
    commander: mtgCard(
      '', '',
      ''
    ),
    keyCards: [],
    owner: 'Nic',
    location: { case: caseName },
    status: 'Testing'

  }
];

export default chronicleOfVictoryDecks;
