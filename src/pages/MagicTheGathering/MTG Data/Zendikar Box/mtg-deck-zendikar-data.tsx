import type { MtgDeck } from "../../../../types/mtg-types";
import { mtgCard } from "../../mtgHelperFunctions";

const caseName = "Zendikar Box";
const dragonShield = "Dragon Shield";

const mahaCaseDecks: MtgDeck[] = [
  { /* Robo Racers */
    id: 'robo-racer',
    name: 'Robo Racers',
    colors: ['W', 'U'],
    shortDescription: 'Artifact creature vehicles.',
    longDescription: <>
      Deck focuses on putting out artifacts and vehicles, and getting 
      them up and running. Vroom vroom, racers!
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Mendicant Core, Guidelight', 'WU',
      'https://scryfall.com/card/dft/213/mendicant-core-guidelight',
      'Power equal to artifacts and can, eventually, create dupes of artifacts.'
    ),
    keyCards: [
      mtgCard(
        'Salvation Engine', '4W',
        'https://scryfall.com/card/dft/27/salvation-engine'
      ),
      mtgCard(
        'Master of Etherium', '2U',
        'https://scryfall.com/card/moc/226/master-of-etherium'
      ),
      mtgCard(
        'Unidentified Hovership', '1WW',
        'https://scryfall.com/card/dsk/37/unidentified-hovership'
      ),
      mtgCard(
        'Sharding Sphinx', '4UU',
        'https://scryfall.com/card/moc/235/sharding-sphinx'
      ),
      mtgCard(
        'Voyage Home', '5WU',
        'https://scryfall.com/card/dft/421/voyage-home'
      ),
      mtgCard(
        'Kotori, Pilot Prodigy', '1WU',
        'https://scryfall.com/card/nec/2/kotori-pilot-prodigy'
      ),
      mtgCard(
        'Thopter Assembly', '6',
        'https://scryfall.com/card/pmbs/140%E2%98%85/thopter-assembly'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      sleeves: 'Mint Matte',
      sleevesMaker: dragonShield
    },
    status: 'Good',
  },
  { /* Spellsy Vampires */
    id: 'spellsy-vampires',
    name: 'Spellsy Vampires',
    colors: ['B', 'R', 'U'],
    shortDescription:
      'Vampires with a mix of spell slinging',
    longDescription: <>
      Use Cormela to get extra spell slinging going. Keep pressure
      up 
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Cormela, Glamour Thief', '1UBR',
      'https://scryfall.com/card/snc/301/cormela-glamour-thief',
      'Extra mana for instants and sorceries along with returning one on death.'
    ),
    keyCards: [
      mtgCard(
        'Archmage of Runes', '3UU',
        'https://scryfall.com/card/fdn/30/archmage-of-runes'
      ),
      mtgCard(
        'High Fae Trickster', '3U',
        'https://scryfall.com/card/fdn/307/high-fae-trickster'
      ),
      mtgCard(
        'Festival of Embers', '4R',
        'https://scryfall.com/card/blb/316/festival-of-embers'
      ),
      mtgCard(
        'Rite of the Dragoncaller', '4RR',
        'https://scryfall.com/card/fdn/92/rite-of-the-dragoncaller'
      ),
      mtgCard(
        'Blightning', '1BR',
        'https://scryfall.com/card/a25/198/blightning'
      ),
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      sleeves: 'Blood Red',
      sleevesMaker: dragonShield
    },
    status: 'Needs Improvement',
  },
  { /* Titanic Kaiju */
    id: 'titanic-kaiju',
    name: 'Titanic Kaiju',
    colors: ['G'],
    shortDescription:
      'Summon giant behemoth creatures to stomp the opponent.',
    longDescription: <>
      Pull Mayael out to start quickly cycling through your deck for the
      biggest and baddest creatures you can find. Overwhelm the opponent
      with raw power and devastating entry effects. This is rounded out
      with Werewolves, allowing me to play early/mid-game that then
      transforms into late-game threats when I stop casting spells.
    </>,
    deckType: 'Commander',
    commander: mtgCard(
      'Mayael the Anima', 'RGW',
      'https://scryfall.com/card/c13/199/mayael-the-anima',
      'Check 5 cards for your favorite big guy among them.'
    ),
    keyCards: [
      mtgCard(
        'Darksteel Colossus', '11',
        'https://scryfall.com/card/fdn/671/darksteel-colossus'
      ),
      mtgCard(
        'Vorinclex, Voice of Hunger', '6GG',
        'https://scryfall.com/card/sld/1623/vorinclex-voice-of-hunger'
      ),
      mtgCard(
        'Vivien Reid', '3GG',
        'https://scryfall.com/card/fdn/234/vivien-reid'
      )
    ],
    owner: 'Nic',
    location: {
      case: caseName,
      sleeves: 'Green'
    },
    status: 'Great',
  }
];

export default mahaCaseDecks;
