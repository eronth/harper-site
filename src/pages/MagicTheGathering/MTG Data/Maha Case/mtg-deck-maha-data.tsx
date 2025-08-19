import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Maha Case";
const eluge = "'Eluge the Flood Gar' Box";
const lumra = "'Lumra of the Lost Woods' Box";
const dragonhawk = "'Dragonhawk the Tempest' Box";
const beza = "'Beza the Bounding Spring' Box";

const mahaCaseDecks: MtgDeck[] = [
  { /* Merrow Miller */
    id: 'merrow-miller',
    name: 'Classic Lorwyn Merrow Miller',
    colors: ['U'],
    shortDescription: 'Very aggressive milling with merfolk tribal.',
    longDescription: <>
      This deck focuses on quickly milling the opponent's 
      library using a combination of merfolk creatures and their
      Lorwyn-era milling mechanics. With a cheap enough spinup, this
      deck is a quick engine with decent recovery.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Grimoire Thief', 'UU',
        'https://scryfall.com/card/mor/35/grimoire-thief'
      ),
      mtgCard(
        'Merrow Commerce', '1U',
        'https://scryfall.com/card/lrw/72/merrow-commerce'
      ),
      mtgCard(
        'Drowner of Secrets', '2U',
        'https://scryfall.com/card/lrw/58/drowner-of-secrets'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: eluge
    },
    status: 'Great',
  },
  { /* Frog-et About It */
    id: 'frog-et-about-it',
    name: 'Frog-et About It',
    colors: ['U', 'G'],
    shortDescription:
      'Constant bouncing frogs grow big and strong.',
    longDescription: <>
      This deck revolves around the synergy between frog creatures and
      their ability to bounce back to hand, allowing for repeated
      casting and growth. With a focus on frog growth, this deck 
      works to chain effects and quickly grow a giant toad monster.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Valley Mightcaller', 'G',
        ''
      ),
      mtgCard(
        'Sunshower Druid', 'G',
        ''
      ),
      mtgCard(
        'Three Tree Scribe', '1G',
        ''
      ),
      mtgCard(
        'Dour Port-Mage', '1U',
        ''
      ),
      mtgCard(
        'Clement, the Worrywort', '1GU',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: eluge
    },
    status: 'Great',
  },
  { /* Endless Rabbits */
    id: 'endless-rabbits',
    name: 'Endless Rabbits!',
    colors: ['W', 'G'],
    shortDescription: 'Rabbit tribal that creates tons of rabbit tokens.',
    longDescription: <>
      Quickly generate numerous rabbit tokens, and use the
      raw numbers
      to buff other creatures' effects (Such as Finneas
      or Burrowguard Mentor).
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Finneas, Ace Archer', 'GW',
        ''
      ),
      mtgCard(
        'Burrowgua4rd Mentor', 'GW',
        ''
      ),
      mtgCard(
        'For the Common Good', 'XXG',
        ''
      ),
      mtgCard(
        'March of the World Ooze', '3GGG',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: lumra
    },
    status: 'Great',
  },
  { /* Raccoon Rumble */
    id: 'raccoon-rumble',
    name: 'Raccoon Rumble',
    colors: ['R', 'G'],
    shortDescription: 'Raccoon Tribal',
    longDescription: <>
      
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Muerra, Trash Tactician, Ace Archer', '1RG',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: lumra
    },
    status: 'Good',
  },
  { /* Manifest Dread */
    id: 'manifest-dread',
    name: 'Manifest Dread',
    colors: ['G', 'B'],
    shortDescription: 'Manifest Dread.',
    longDescription: <>
      Use Duskmourn's 'Manifest Dread' mechanic to put unknown
      threats onto the board. Get through your deck quickly to get
      the scary boys out.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Manifest Dread', '1G',
        ''
      ),
      mtgCard(
        'Under the Skin', '2G',
        ''
      ),
      mtgCard(
        'Valgavoth\'s Onslaught', 'XXG',
        ''
      ),
      mtgCard(
        'Demonic Counsel', '1B',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: lumra
    },
    status: 'Needs Improvement',
  },
  { /* Mouseguard */
    id: 'mouseguard',
    name: 'Mouseguard',
    colors: ['W', 'R'],
    shortDescription: 'A ',
    longDescription: <>
      A Mouseguard crew from teh Bloomburrow Mice. Fast fighters
      with buffs to spread around, making it hard to take down a 
      central target.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Mabel, Heir to Cragflame', '1RW',
        ''
      ),
      mtgCard(
        'Valley Questcaller', '1W',
        ''
      ),
      mtgCard(
        'Heartfire Hero', 'R',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: beza
    },
    status: 'Needs Improvement',
  },
  { /* Lorwyn (Classic) Kithkin - The Clachan*/
    id: 'the-kithkin-clachan',
    name: 'The Kithkin Clachan',
    colors: ['W'],
    shortDescription: 'A simple classic Lorwyn white weenie deck.',
    longDescription: <>
      This deck utilizes the classic Lorwyn/Morningtide
      kithkin and soldiers. Put out a growing army while
      keeping moderate control of the battlefield.
    </>,
    deckType: '60-Card',
    keyCards: [
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: beza
    },
    status: 'Needs Improvement',
  },
  { /* Kor Armory*/
    id: 'kor-armory',
    name: 'Kor Armory',
    colors: ['W'],
    shortDescription:
      'A zendikar Kor equipment oriented deck.',
    longDescription: <>
      Quickly pull artifact equipment to give to your Armament
      Master, buffing the whole kor army. Uses cheap equipment
      to easily get out and equip.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Armament Master', 'WW',
        ''
      ),
      mtgCard(
        'Kor Outfitter', 'WW',
        ''
      ),
      mtgCard(
        'Kor Duelist', 'W',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: dragonhawk
    },
    status: 'Good',
  },
  { /* Figure of Destiny */
    id: 'figure-of-destiny',
    name: 'Figure of Destiny',
    colors: ['W', 'R'],
    shortDescription:
      'A red-white kithkin soldiers deck focused around levelling Figure of Destiny.',
    longDescription: <>
      
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Figure of Destiny', '1(R/W)',
        ''
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: dragonhawk
    },
    status: 'Needs Improvement',
  }
];

export default mahaCaseDecks;
