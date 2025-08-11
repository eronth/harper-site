import type { Project } from "../../../../types/project-types";

const project: Project = {
  id: 'leather-beetle-bag-creation',
  title: 'Handcrafted Leather Messenger Bag',
  worker: 'Leslie',
  category: 'Leatherwork',
  status: 'In Progress',
  startDate: '2025-01-10',
  lastUpdated: '2025-08-11',
  shortDescription: 'Creating a custom leather messenger bag from scratch using traditional leatherworking techniques.',
  detailedDescription: <>
  
  </>,
  images: [
    {
      src: '/images/projects/leather-pattern.jpg',
      alt: 'Paper pattern pieces laid out',
      caption: 'Initial pattern pieces created from cardboard templates'
    },
    {
      src: '/images/projects/leather-cutting.jpg',
      alt: 'Leather pieces cut and laid out',
      caption: 'All major pieces cut from the leather hide'
    }
  ],
  materials: [
    'Vegetable-tanned leather (8-10 oz weight)',
    'Linen thread',
    'Brass hardware (buckles, rings, rivets)',
    'Leather conditioner',
    'Edge paint or burnishing compound'
  ],
  tools: [
    'Leather cutting knife',
    'Stitching awl',
    'Edge beveler',
    'Leather punches',
    'Mallet',
    'Stitching pony',
    'Ruler and square'
  ],
  steps: [
    'Create paper pattern and test fit',
    'Transfer pattern to leather and cut pieces',
    'Skive edges where pieces will overlap',
    'Punch stitching holes',
    'Dye leather if desired',
    'Begin assembly with main body pieces',
    'Add internal pockets and dividers',
    'Attach straps and hardware',
    'Final conditioning and finishing'
  ],
  walkthrough: <>
  </>,
  summary: {
    challenges: [
      'Ensuring consistent stitch spacing by hand',
      'Getting clean, professional-looking edges',
      'Proper planning to avoid mistakes in expensive leather'
    ],
    learnings: [
      'Patience is essential in leatherwork',
      'The importance of sharp tools for clean cuts',
      'How leather grain direction affects durability'
    ],
    nextSteps: [
      'Complete main body assembly',
      'Add internal pocket structure',
      'Install shoulder strap and hardware'
    ]
  }
};

export default project;
