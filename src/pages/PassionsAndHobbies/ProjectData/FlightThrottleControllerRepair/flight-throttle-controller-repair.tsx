import type { Project } from "../../../../types/project-types";

const project: Project = {
  id: 'pc-flight-throttle-repair',
  title: 'PC Flight Throttle Electronics Repair',
  worker: 'Nic',
  category: 'Electronics',
  status: 'In Progress',
  startDate: '2024-12-15',
  lastUpdated: '2025-08-11',
  shortDescription: 'Rewiring and repairing the internal electronics of a vintage PC flight throttle controller to bring it back to life.',
  detailedDescription: `This project involves completely rewiring the internal electronics of an old PC flight throttle that stopped working. The original potentiometers had worn out and several connections had corroded over time. 

The goal is to replace the internal components with modern equivalents while maintaining the original external appearance and feel. This includes installing new potentiometers, updating the wiring harness, and potentially adding USB connectivity if the original serial connection proves problematic.

The throttle has sentimental value as it was used for countless hours of flight simulation, so restoring it to working condition feels like bringing back a piece of gaming history.`,
  images: [
    {
      src: '/images/projects/throttle-before.jpg',
      alt: 'Original throttle before repairs',
      caption: 'The throttle in its original state - externally fine but internally broken'
    },
    {
      src: '/images/projects/throttle-internals.jpg',
      alt: 'Internal electronics exposed',
      caption: 'Corroded connections and worn potentiometers visible after opening'
    }
  ],
  materials: [
    'Linear potentiometers (10kΩ)',
    'Multi-strand copper wire',
    'Heat shrink tubing',
    'Electrical solder',
    'Cleaning supplies (isopropyl alcohol, etc.)'
  ],
  tools: [
    'Soldering iron and station',
    'Wire strippers',
    'Multimeter',
    'Small screwdrivers',
    'Desoldering braid'
  ],
  steps: [
    'Disassemble the throttle housing carefully',
    'Document original wiring with photos',
    'Test all components to identify failures',
    'Remove corroded and broken components',
    'Clean all surfaces and connections',
    'Install new potentiometers',
    'Rewire with fresh connections',
    'Test functionality before reassembly',
    'Reassemble and calibrate'
  ],
  challenges: [
    'Sourcing exact replacement potentiometers with correct dimensions',
    'Working in the cramped internal space',
    'Maintaining original calibration and feel'
  ],
  learnings: [
    'Better understanding of potentiometer types and applications',
    'Improved soldering technique for tight spaces',
    'Importance of documenting original state before modification'
  ],
  nextSteps: [
    'Complete potentiometer replacement',
    'Test with flight simulation software',
    'Consider adding USB interface for modern compatibility'
  ]
};

export default project;
