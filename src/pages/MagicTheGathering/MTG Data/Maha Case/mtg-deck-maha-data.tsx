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
      deckbox: eluge,
      sleeves: 'Lotus Water Lillies'
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
  },
  { /* Izzet Otters */
    id: 'izzet-otters',
    name: 'This Otter Be Fun',
    colors: ['U','R'],
    shortDescription: 'Noncreature Spell Engine.',
    longDescription: <>
      "Castin' lines or castin' spells, ain't no one better than this deck."
    </>,
    deckType: '60-Card',
        keyCards: [ 
      mtgCard(
        'Tempest Angler', '1U/RU/R',
        'https://scryfall.com/card/blb/235/tempest-angler'
      ),
      mtgCard(
        'Coruscation Mage', '1R',
        'https://scryfall.com/card/blb/131/coruscation-mage'
      )
    ],
    
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Rottenmouth Viper Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Good', 
  },
  { /* Monoblack Rottenmouth */
    id: 'monoblack-rottenmouth',
    name: 'Monoblack Rottenmouth',
    colors: ['B'],
    shortDescription: 'First deck, because i am an edgelord.',
    longDescription: <>
      IDK, bully the field until Rottenmouth can appear i guess.
    </>,
    deckType: '60-Card',
        keyCards: [ 
      mtgCard(
        'Rottenmouth Viper', '5B',
        'https://scryfall.com/card/blb/290/rottenmouth-viper'
      ),
      mtgCard(
        'Fell', '1B',
        'https://scryfall.com/card/blb/383/fell'
      )
    ],
    
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Rottenmouth Viper Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement', 
  },
  { /* Vren, The Relentless */
    id: 'vren-the-relentless',
    name: 'Vren, The Relentless',
    colors: ['U', 'B'],
    shortDescription: 'Rats, rats, we are the rats.',
    longDescription: <>
      Kill creatures and generate more and more rats. Rats get stronger as more of their kin enter the field.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Vren, The Relentless', '2UB',
      'https://scryfall.com/card/blb/239/vren-the-relentless',
      'If a creature an opponent controls would die, exile it instead. Create X 1/1 rat tokens with +1/+1 for every other rat controlled.'
    ),
    keyCards: [
      mtgCard(
        'Revenge of the Rats', '2BB',
        'https://scryfall.com/card/fdn/67/revenge-of-the-rats'
      ),
    
    ],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Maha, Its Feathers Night Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement', 
  },
  { /* Gev, Scaled Scorch */
    id: 'gev-scaled-scorch',
    name: 'Gev, Scaled Scorch',
    colors: ['B', 'R'],
    shortDescription: 'Poking with fire.',
    longDescription: <>
      +1/+1 counters, lizard-heavy, utilize second main phase.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Gev, Scaled Scorch', 'BR',
      'https://scryfall.com/card/blb/214/gev-scaled-scorch',
      'Ward - Pay 2 life. Deal 1 damage whenever a Lizard spell is cast. Creatures enter with +1/+1 for each opponent who lost life.'
    ),
        keyCards: [ 
      mtgCard(
        'Hearthborn Battler', '2R',
        'https://scryfall.com/card/blb/139/hearthborn-battler'
      ),
      mtgCard(
        'Sinister Monolith', '3B',
        'https://scryfall.com/card/blb/113/sinister-monolith'
      )
    ],
    
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Sunspine Lynx Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement', 
  },
  { /* Golgari Squirrels */
    id: 'golgari-squirrels',
    name: 'Golgari Squirrels',
    colors: ['B', 'G'],
    shortDescription: 'Food, Menace, and Squirrels Galore',
    longDescription: <>
      Lotsa squirrels, lotsa food tokens, lotsa exiling and foraging.
    </>,
    deckType: '60-Card',
        keyCards: [ 
      mtgCard(
        'Camellia, the Seedmiser', '1BG',
        'https://scryfall.com/card/blb/207/camellia-the-seedmiser'
      ),
      mtgCard(
        'Chatterfang, Squirrel General', '2G',
        'https://scryfall.com/card/mh2/151/chatterfang-squirrel-general'
      )
    ],
    
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Ygra Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Great', 
  },
];

export default mahaCaseDecks;
