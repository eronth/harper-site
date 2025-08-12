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
    'Disassemble the throttle',
    ''
  ],
  walkthrough: <>
    First, I recreated the original button-press wiring just to test the very basics. Here I show 
    the incredibly roughly done wiring just for testing. The blue wire acts as the pin-out (leading to
    pin 8 in this example), and the short orange wire is my "button", so to speak.
    I simply plug the orange wire in the same row as the blue wire to "press" the button.

    <br /><br />

    It can be seen from the terminal output that the button press is registered correctly. In this case, the button we
    have wired up is the first value of the "Grip Button States". While unplugged (or button unpressed) we get 0, 
    when plugged we get 1. The other values are just wrong for now.

    <br /><br />

    Once we're confident the basic button presses work, it's time to test the other components. Here we wire up a few
    of the actual buttons, and replace the fake-button orange wire. Tests with an actual button show the same results.

    <br /><br />

    So with a series of tests using the functional button, I narrow down that, somehow, the 
    5v-in wires are all non-functional in the throttle. That's a pretty weird failure mode, but it is what it is.
    So the plan of attack for here is as follows:
    <ol>
      <li>
        Ensure each purple signal-pin wire still works.
      </li>
      <li>
        Map the purple signal-pin wires to their respective pinouts on the Leonardo board and give them
        color-coded ends to more easily assess connections in the future.
      </li>
      <li>
        Update the purple wires (now with color-coded ends) to have a connector for easier future repairs.
      </li>
      <li>
        Ensure each white grounding wire still works.
      </li>
      <li>
        Determine best course of action for resistors (directly to button, directly to ground,
         or disconnectable from both).
      </li>
      <li>
        Ensure everything so far works at this point, then assess the 5v black wire situation.
      </li>
    </ol>


  </>,
  summary: {
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
  },
};

export default project;
