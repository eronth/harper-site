// Lego Holiday Village data structures
import gingerbreadHomeImages from '../../../../assets/lego-village/village photos/gingerbread home';
import trainStationImages from '../../../../assets/lego-village/village photos/train station';
import miniBakeryImages from '../../../../assets/lego-village/village photos/mini bakery';
import greatTreeImages from '../../../../assets/lego-village/village photos/great tree';
import icePondImages from '../../../../assets/lego-village/village photos/ice pond';

export interface VillageImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Building {
  id: string;
  townId: string;
  name: string;
  description: string;
  thumbnail?: string;
  images: VillageImage[];
  dateAdded?: string;
  isFeatured?: boolean;
}

export interface Town {
  id: string;
  name: string;
  description: string;
  featured?: boolean; // For double-wide layout
}

// Town definitions
export const towns: Town[] = [
  {
    id: 'holiday-village',
    name: 'Holiday Village',
    description: 'The main collection of festive buildings that started it all.',
    featured: true, // Gets double-wide display
  },
  {
    id: 'festive-city',
    name: 'Festive City',
    description: 'The bustling city adjacent to the village.',
    featured: false,
  },
  {
    id: 'north-pole',
    name: 'North Pole',
    description: 'Santa\'s workshop and the magical North Pole town.',
    featured: false,
  },
];

// Building definitions
export const buildings: Building[] = [
  {
    id: 'gingerbread-home',
    townId: 'holiday-village',
    name: 'Gingerbread Home',
    description: 'A cozy gingerbread house with sweet details and festive decorations.',
    thumbnail: gingerbreadHomeImages[0],
    images: gingerbreadHomeImages.map((src, index) => ({
      src,
      alt: `Gingerbread Home - Photo ${index + 1}`,
      caption: '', // You can add captions later
    })),
    isFeatured: false,
  },
  {
    id: 'train-station',
    townId: 'holiday-village',
    name: 'Train Station',
    description: 'The holiday village train station where travelers arrive for the season.',
    thumbnail: trainStationImages[0],
    images: trainStationImages.map((src, index) => ({
      src,
      alt: `Train Station - Photo ${index + 1}`,
      caption: '', // You can add captions later
    })),
    isFeatured: false,
  },
  {
    id: 'mini-bakery',
    townId: 'holiday-village',
    name: 'Mini Bakery',
    description: 'A charming little bakery serving fresh holiday treats.',
    thumbnail: miniBakeryImages[0],
    images: miniBakeryImages.map((src, index) => ({
      src,
      alt: `Mini Bakery - Photo ${index + 1}`,
      caption: '', // You can add captions later
    })),
    isFeatured: false,
  },
  {
    id: 'great-tree',
    townId: 'holiday-village',
    name: 'Great Tree',
    description: 'The magnificent centerpiece tree of the holiday village.',
    thumbnail: greatTreeImages[0],
    images: greatTreeImages.map((src, index) => ({
      src,
      alt: `Great Tree - Photo ${index + 1}`,
      caption: '', // You can add captions later
    })),
    isFeatured: false,
  },
  {
    id: 'ice-pond',
    townId: 'holiday-village',
    name: 'Ice Pond',
    description: 'A frozen pond where villagers enjoy ice skating.',
    thumbnail: icePondImages[0],
    images: icePondImages.map((src, index) => ({
      src,
      alt: `Ice Pond - Photo ${index + 1}`,
      caption: '', // You can add captions later
    })),
    isFeatured: false,
  },
  {
    id: 'firehouse',
    townId: 'holiday-village',
    name: 'Firehouse',
    description: 'The holiday village fire station, always ready to help.',
    thumbnail: undefined,
    images: [], // No images yet
    isFeatured: false,
  },
  {
    id: 'toyshop',
    townId: 'holiday-village',
    name: 'Toyshop',
    description: 'A magical toyshop filled with holiday wonders.',
    thumbnail: undefined,
    images: [], // No images yet
    isFeatured: false,
  },
];

// Manually curated newest additions (you can update this list)
export const newestAdditions: string[] = [
  'gingerbread-home',
  'train-station',
  'mini-bakery',
];

// Helper functions
export function getBuildingById(id: string): Building | undefined {
  return buildings.find(b => b.id === id);
}

export function getBuildingsByTown(townId: string): Building[] {
  return buildings.filter(b => b.townId === townId);
}

export function getNewestBuildings(): Building[] {
  return newestAdditions
    .map(id => getBuildingById(id))
    .filter((b): b is Building => b !== undefined);
}

export function getTownById(id: string): Town | undefined {
  return towns.find(t => t.id === id);
}
