import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";
import { ultraPro } from "../sleeve-maker-data";

const caseName = "Duskmourn Case";
const beasties = 'Beastie Box';

const duskmournCaseDecks: MtgDeck[] = [
  { /* Trick or Treat, Zimone! */
    id: 'trick-or-treat-zimone',
    name: 'Trick Or Treat, Zimone!',
    colors: ['G', 'U'],
    shortDescription: 'Take Zimone trick or treating with her guardian.',
    longDescription: <>
      This deck focuses on a combination of landfall, food tokens (treats),
      choices (Choose one — Trick or Treat) and spooky stuff to create a fun
      Halloween-themed deck. Take Zimone trick or treating by spawning her guardian,
      and try to keep your opponent
      off of Zimone or the guardian.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Zimone, All-Questioning', '1GU',
      'https://scryfall.com/card/dsk/241/zimone-all-questioning',
      'Prime-Landfall(ish) — Create a guardian with the +1/+1 counters equal to the prime number of lands you control.'
    ),
    keyCards: [
      mtgCard(
        'Jack-o\'-Lantern', '1',
        'https://scryfall.com/card/dbl/254/jack-o-lantern'
      ),
      mtgCard(
        'Haunted Cloak', '3',
        'https://scryfall.com/card/cmm/389/haunted-cloak'
      ),
      mtgCard(
        'Welcome to Sweettooth', '1G',
        'https://scryfall.com/card/woe/198/welcome-to-sweettooth'
      ),
      mtgCard(
        'Night of the Sweet\'s Revenge', '3G',
        'https://scryfall.com/card/woe/178/night-of-the-sweets-revenge'
      ),
      mtgCard(
        'Lakeside Shack', '',
        'https://scryfall.com/card/dsk/262/lakeside-shack'
      ),
      mtgCard(
        'The Shire', '',
        'https://scryfall.com/card/ltr/756/the-shire'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Zimone Box'
    },
    status: 'Good',
  },
  { /* Cult of the Moth */
    id: 'cult-of-the-moth',
    name: 'Cult of the Moth',
    colors: ['W', 'B'],
    shortDescription:
      'Life and death manipulation.',
    longDescription: <>
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Victor, Valgavoth\'s Seneschal', '1WB',
      'https://scryfall.com/card/dsk/238/victor-valgavoths-seneschal',
      'Surveil, force discard, and revive creatures by spawning enchantments.'
    ),
    keyCards: [
      mtgCard(
        'Valgavoth, Terror Eater', '6BBB',
        'https://scryfall.com/card/dsk/352/valgavoth-terror-eater',
        //'https://scryfall.com/card/dsk/120/valgavoth-terror-eater',
      ),
      mtgCard(
        'Grievous Wound', '3BB',
        'https://scryfall.com/card/dsk/102/grievous-wound'
      ),
      mtgCard(
        'Athreos, God of Passage', '1WB',
        'https://scryfall.com/card/sld/76/athreos-god-of-passage'
      ),
      mtgCard(
        'Goldenglow Moth', 'W',
        'https://scryfall.com/card/m11/15/goldenglow-moth'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Victor Box'
    },
    status: 'Good',
  },
  { /* Arabella's Toybox */
    id: 'arabella-toybox',
    name: 'Arabella\'s Toybox',
    colors: ['W', 'R'],
    shortDescription: 'Numerous small creatures with fighting spirit.',
    longDescription: <>
      This deck leverages small creatures to amp up Arabella's burn ability.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Arabella, Abandoned Doll', 'RW',
      'https://scryfall.com/card/dsk/208/arabella-abandoned-doll',
      'When attacks, deal x and heal x. X is number of power ≤ 2 creatures you control.',
    ),
    alternateCommander: mtgCard(
      'Gisela, Blade of Goldnight', '4RWW',
      'https://scryfall.com/card/mkc/211/gisela-blade-of-goldnight',
      'Angel to swing damage in my favor.'
    ),
    keyCards: [
      mtgCard(
        'Elspeth, Knight-Errant', '2WW',
        'https://scryfall.com/card/mma/13/elspeth-knight-errant'
      ),
      mtgCard(
        'Enduring Innocence', '1WW',
        'https://scryfall.com/card/dsk/6/enduring-innocence'
      ),
      mtgCard(
        'Stigma Lasher', 'RR',
        'https://scryfall.com/card/eve/62/stigma-lasher'
      ),
      mtgCard(
        'Mirran Crusader', '1WW',
        'https://scryfall.com/card/mm2/25/mirran-crusader'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: 'Marvin Box'
    },
    status: 'Good',
  },
  { /* Bu! Zombies! */
    id: 'bu-zombies',
    name: 'Bu! Zombies!',
    colors: ['B', 'U'],
    shortDescription: 'Zombie Tribal with a blue twist.',
    longDescription: <>
      Straightforward. Summon zombies. Fight with zombies. Summon zombies again.
      Keep pressure up with <i className="ms ms-b" /> and <i className="ms ms-u" /> control.
    </>,
    deckType: '60-Card',
    keyCards: [
      mtgCard(
        'Death Baron', '1BB',
        'https://scryfall.com/card/fdn/521/death-baron'
      ),
      mtgCard(
        'Diregraf Captain', '1UB',
        'https://scryfall.com/card/mic/148/diregraf-captain'
      ),
      mtgCard(
        'Endless Ranks of the Dead', '2BB',
        'https://scryfall.com/card/mic/116/endless-ranks-of-the-dead'
      ),
      mtgCard(
        'Waterfront District', '',
        'https://scryfall.com/card/snc/357/waterfront-district'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: beasties,
    },
    status: 'Good',
  },
  { /* Elven Assassins */
    id: 'elven-assassins',
    name: 'Elven Assassins',
    colors: ['G', 'B'],
    shortDescription: 'Use deathtouch and murder to threaten opponents.',
    longDescription: <>
      Using various forms of deathtouch and direct murder, control the board.
      Glissa comes with some deathtouch and first strike, making her an 
      incredibly potent threat just by existing.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Glissa Sunslayer', '1BG',
      'https://scryfall.com/card/one/318/glissa-sunslayer',
      'Deathtouch and first strike.'
    ),
    keyCards: [
      mtgCard(
        'Cairn Wanderer', '4B',
        'https://scryfall.com/card/c20/130/cairn-wanderer'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      deckbox: beasties
    },
    status: 'Needs Improvement',
  },
  { /* Cabaretti Cats & Canines */
    id: 'cabaretti-cats-and-canines',
    name: 'Cabaretti Cats & Canines',
    colors: ['R', 'G', 'W'],
    shortDescription: 'Kitties!! and Puppies!!',
    longDescription: <>
      Make tokens, then make MORE tokens, and have them all attack at once.
    </>,
    deckType: 'Commander', // Options: '60-Card', 'Commander'
    commander: mtgCard(
      'Jinnie Fay, Jetmirs Second', 'R/GGG/W',
      'https://scryfall.com/card/snc/313/jinnie-fay-jetmirs-second',
      'If you would create tokens, you may instead create that many 2/2 green Cats with haste or that many 3/1 green Dogs with vigilance.'
    ),
    keyCards: [
      mtgCard(
        'Doubling Season', '4G',
        'https://scryfall.com/card/fdn/216/doubling-season'
      ),
      mtgCard(
        'Rabble Rousing', '4W',
        'https://scryfall.com/card/snc/24/rabble-rousing'
      ),
      mtgCard (
        'Titanic Ultimatum', 'RRGGGWW',
        'https://scryfall.com/card/ddh/31/titanic-ultimatum'
      )
    ],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Niko Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Great', 
  },
  { /* Soul Steeper */
    name: 'Soul Steeper',
    id: 'soul-steeper',
    colors: ['B', 'G'],
    shortDescription: 'Leslie as a Commander',
    longDescription: <>
      Green-black deck with a witch drinking tea. Slowly drain with life gain, then attack with a biggie.
    </>,
    deckType: 'Commander', // Options: '60-Card', 'Commander'
    commander: mtgCard(
      'Dina, Soul Steeper', 'BG',
      'https://scryfall.com/card/mul/37/dina-soul-steeper',
      'When you gain life, opponent loses 1 life. 1 Sac: Dina gets +X/+0 until end of turn, where X is the sacrificed creatures power'
    ),
    keyCards: [ 
     
    ],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'Niko Box' // Rename this to the actual deckbox name
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Testing',
  },
  { /* Cloudspire Racing */
    name: 'Cloudspire Racing',
    id: 'cloudspire-racing',
    colors: ['R', 'W'],
    shortDescription: 'Deck to be an example.',
    longDescription: <>
      This is a placeholder deck used as an example in the codebase.
    </>,
    deckType: 'Commander', // Options: '60-Card', 'Commander'
    commander: mtgCard(
      'Kolodin, Triumph Caster', 'RW',
      'https://scryfall.com/card/dft/210/kolodin-triumph-caster',
      'Mounts and Vehicles you control have haste, and they become saddled or artifact creatures til end of turn.'
    ),
    keyCards: [],
    owner: 'Leslie',
    location: {
      case: caseName, // Automatically filled out, don't change.
      deckbox: 'The Wanderer Box', // Rename this to the actual deckbox name
      sleeves: 'Bright Blue',
      sleevesMaker: ultraPro
    },
    // Status Options: 'Incomplete', 'Needs Improvement', 'Good', 'Great'
    // We can add or change options as we see fit.
    status: 'Needs Improvement',
  }
];

export default duskmournCaseDecks;
