export type BookRecommender = 'Nic' | 'Leslie';

export type Book = {
  id: string;
  title: string;
  author: string;
  recommender: BookRecommender[];
  blurb: React.ReactNode;
  genre?: string;
};

const books: Book[] = [
  {
    id: 'the-martian',
    title: 'The Martian',
    author: 'Andy Weir',
    recommender: ['Nic', 'Leslie'],
    genre: 'Sci-Fi',
    blurb: <>
      An astronaut gets stranded on Mars, using 
      his botanical and engineering skills to survive while
      strategizing a way to survive until rescue can arrive.
    </>,
  },
  {
    id: 'immune',
    title: 'Immune',
    author: 'Philipp Dettmer',
    recommender: ['Nic'],
    genre: 'Non-Fiction',
    blurb: <>
      A moderately deep dive into the immune
      system (for non-experts),
      exploring its complexities and how it
      protects us from diseases. Not overly technical,
      but still informative and engaging.
    </>,
  },
  {
    id: 'qed-quantum-electrodynamics',
    title: 'QED: Quantum Electrodynamics',
    author: 'Richard P. Feynman',
    recommender: ['Nic'],
    genre: 'Non-Fiction',
    blurb: <>
      A series of lectures by Richard P. Feynman, 
      turned into a book.
      A classic introduction to quantum electrodynamics
      by one of the great physicists of the 20th century.
    </>,
  },
  {
    id: 'humankind-a-hopeful-history',
    title: 'Humankind: A Hopeful History',
    author: 'Rutger Bregman',
    recommender: ['Leslie'],
    genre: 'Non-Fiction',
    blurb: <>
      A book that challenges the widely-held assumption 
      that humans are inherently selfish and cruel. It pulls
      from psychology, anthropology, history, and biology
      to bolster the argument that people are kind and
      cooperative at their cores.
    </>,
  },
  {
    id: 'the-radium-girls',
    title: 'The Radium Girls',
    author: 'Kate Moore',
    recommender: ['Leslie'],
    genre: 'Non-Fiction',
    blurb: <>
      The true story of the young women who worked in
      radium dial factories in the early 1900s, unknowingly
      poisoning themselves in the process. When they
      began suffering from the effects of radium poisoning,
      they fought back against the companies in a landmark
      legal battle that shaped worker safety and labor laws
      forever.
    </>,
  },
  {
    id: 'legends-and-lattes',
    title: 'Legends & Lattes',
    author: 'Travis Baldree',
    recommender: ['Leslie'],
    genre: 'Cozy Fantasy',
    blurb: <>
      This cozy fantasy novel follows Viv, an orc adventurer
      who hangs up her sword to open the first coffee shop
      in a small city. The story focuses on community, found
      family, and a little romance woven in. Low stakes,
      high fantasy.
    </>,
  }
];

export default books;
