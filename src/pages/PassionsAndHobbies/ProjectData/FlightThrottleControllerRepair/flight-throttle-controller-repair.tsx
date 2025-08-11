import type { Project } from "../../../../types/project-types";

const project: Project = {
  id: 'pc-flight-throttle-repair',
  title: 'PC Flight Throttle Electronics 2nd Repair',
  worker: 'Nic',
  category: 'Electronics',
  status: 'In Progress',
  startDate: '2024-12-15',
  lastUpdated: '2025-08-11',
  shortDescription: 'Rewiring and repairing the internal electronics of a vintage PC flight throttle controller to bring it back to life.',
  detailedDescription:
  <>
    This project involves trying to repair the functionality of a vintage PC flight throttle. It's a
    Thrustmaster "Attack Throttle" controller I <s>looted</s> inherited from my grandfather.
    It appears it was once used for a top-gun flight game.
    <br />
    <br />
    I had previously removed and replaced the electronics with a custom setup using entirely new wiring,
    and a Leonardo board with pinouts for the throttle controls, 
    but somewhere along the way something went wrong and it stopped working.
    <br />
    <br />
    In diagnosing the issue, I largely found that the wiring I had set up was frustrating to actually measure.
    Part of the attempt here was to break up some of the less-modular parts of the wiring to ensure
    better accessibility and easier troubleshooting in the future. Additionally, I obviously wanted to
    get things working again.
  </>,
  images: [
    {
      src: '/images/projects/throttle-before.jpg',
      alt: 'Original throttle before repairs',
      caption: 'The throttle in its original state - externally fine but internally broken'
    },
    {
      src: '/images/projects/throttle-internals.jpg',
      alt: 'Internal electronics exposed',
      caption: 'Disassembled view of the throttle internals'
    }
  ],
  materials: [
    'Simple multi-colored wires',
    'Wire connectors of various types',
    'Solder',
    'Heat shrink tubing',
    'Electrical tape',
  ],
  tools: [
    'Soldering iron and station',
    'Wire strippers and clippers',
    'Multimeter',
    'Small screwdrivers (from kit)',
    'Various Equipment for testing',
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
