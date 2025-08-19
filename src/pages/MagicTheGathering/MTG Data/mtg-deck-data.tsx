import type { MtgDeck } from '../../../types/mtg-types';
import mahaCaseDecks from './Maha Case/mtg-deck-maha-data';

// Sample deck data - you can replace this with your actual decks
// const winterCase = "Speed Demon Winter Case";
// const mahaCase = "Maha Case";
// const duskmournCase = "Duskmourn Case";
const mtgDecks: MtgDeck[] = [
  ...mahaCaseDecks,
  {
    id: 'edgar-markov-vampires',
    name: 'Edgar Markov Vampire Tribal',
    colors: ['W', 'B', 'R'],
    shortDescription: 'Aggressive vampire tribal with token generation',
    longDescription: 'A classic vampire tribal deck built around Edgar Markov\'s eminence ability. Focuses on flooding the board with vampire tokens and leveraging tribal synergies for explosive turns.',
    deckType: 'Commander',
    commander: {
      name: 'Edgar Markov',
      manaCost: '3RWB',
      magicardsInfoUrl: 'https://magiccards.info/c17/en/36.html',
      description: 'Eminence ability creates vampire tokens whenever you cast vampire spells. Flying, first strike, haste, and makes all vampires +1/+1.'
    },
    keyCards: [
      {
        name: 'Bloodline Keeper',
        manaCost: '2BB',
        magicardsInfoUrl: 'https://magiccards.info/isd/en/90a.html'
      },
      {
        name: 'Elenda, the Dusk Rose',
        manaCost: '2WB',
        magicardsInfoUrl: 'https://magiccards.info/rix/en/157.html'
      },
      {
        name: 'Stensia Masquerade',
        manaCost: '2R',
        magicardsInfoUrl: 'https://magiccards.info/soi/en/184.html'
      }
    ],
    owner: 'Nic',
    location: {
      case: 'Large Black Case',
      deckbox: 'Red Ultra Pro',
    },
    status: 'Good'
  },
  {
    id: 'azorius-control',
    name: 'Azorius Control',
    colors: ['W', 'U'],
    shortDescription: 'Classic control deck with counterspells and board wipes',
    longDescription: 'A traditional control deck focusing on card advantage, counterspells, and powerful finishers. Plays the long game by controlling the board state until it can land a game-winning threat.',
    deckType: '60-Card',
    keyCards: [
      {
        name: 'Teferi, Hero of Dominaria',
        magicardsInfoUrl: 'https://magiccards.info/dom/en/207.html'
      },
      {
        name: 'Wrath of God',
        magicardsInfoUrl: 'https://magiccards.info/10e/en/61.html'
      },
      {
        name: 'Counterspell',
        magicardsInfoUrl: 'https://magiccards.info/7e/en/69.html'
      }
    ],
    owner: 'Leslie',
    location: {
      case: 'Small White Case',
      deckbox: 'Blue BCW',
    },
    status: 'Needs Improvement'
  },
  {
    id: 'mono-green-stompy',
    name: 'Mono-Green Stompy',
    colors: ['G'],
    shortDescription: 'Fast aggressive green creatures and pump spells',
    longDescription: 'An aggressive mono-green deck that aims to deploy efficient creatures quickly and overwhelm opponents with raw power. Features mana dorks, large threats, and pump spells for explosive damage.',
    deckType: '60-Card',
    keyCards: [
      {
        name: 'Llanowar Elves',
        magicardsInfoUrl: 'https://magiccards.info/m19/en/314.html'
      },
      {
        name: 'Steel Leaf Champion',
        magicardsInfoUrl: 'https://magiccards.info/dom/en/182.html'
      },
      {
        name: 'Aspect of Hydra',
        magicardsInfoUrl: 'https://magiccards.info/bng/en/117.html'
      }
    ],
    owner: 'Nic',
    location: {
      case: 'Large Black Case',
      deckbox: 'Green Dragon Shield',
    },
    status: 'Great'
  }
];

export default mtgDecks;
