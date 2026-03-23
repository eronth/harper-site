export type BookRecommender = 'Nic' | 'Leslie' | 'Both';

export type Book = {
  id: string;
  title: string;
  author: string;
  recommender: BookRecommender;
  blurb: string;
  genre?: string;
};

const books: Book[] = [
  {
    id: 'the-name-of-the-wind',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    recommender: 'Nic',
    genre: 'Fantasy',
    blurb: 'The first book of the Kingkiller Chronicle, and possibly the most beautifully written fantasy novel I\'ve ever read. Kvothe\'s voice is magnetic from page one. The magic system is one of the most inventive and internally consistent I\'ve come across.',
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    recommender: 'Both',
    genre: 'Sci-Fi',
    blurb: 'We both devoured this one. A lone astronaut wakes up with no memory, millions of miles from Earth, and has to figure out how to save humanity. It\'s clever, heartfelt, and genuinely funny — with one of the best sci-fi friendships we\'ve read.',
  },
  {
    id: 'piranesi',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    recommender: 'Leslie',
    genre: 'Fantasy',
    blurb: 'A deeply strange and beautiful book about a man living in an infinite house full of statues and tides. The mystery unfolds slowly and rewards patience. One of those books that stays with you long after you finish it.',
  },
  {
    id: 'the-hitchhikers-guide',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    recommender: 'Both',
    genre: 'Sci-Fi Comedy',
    blurb: 'An absolute classic — the answer is 42. Endlessly quotable and still hilarious decades on. Required reading for anyone who enjoys absurdist humor and science fiction that doesn\'t take itself too seriously.',
  },
  {
    id: 'Mexican-gothic',
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    recommender: 'Leslie',
    genre: 'Gothic Horror',
    blurb: 'A glamorous socialite travels to a remote Mexican mansion to rescue her cousin — and finds something far darker than she expected. The atmosphere is suffocating in the best way, and the protagonist is delightfully sharp.',
  },
  {
    id: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    recommender: 'Nic',
    genre: 'Technology',
    blurb: 'More philosophy than tutorial. This book changed how I think about software development as a craft rather than just a job. Full of timeless advice that holds up whether you\'re writing code for the first time or the thousandth.',
  },
];

export default books;
