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
  detailedDescription: `This project involves creating a completely custom leather messenger bag using traditional hand-stitching techniques and high-quality leather. The design focuses on both functionality and aesthetics, with multiple compartments for organization and a classic, timeless appearance.

The bag is being constructed using vegetable-tanned leather which will develop a beautiful patina over time. All hardware is brass for durability and visual appeal. The construction uses saddle-stitching throughout for maximum strength and longevity.

This is both a functional project and a learning experience in traditional craftsmanship techniques that have been used for centuries.`,
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
};

export default project;
