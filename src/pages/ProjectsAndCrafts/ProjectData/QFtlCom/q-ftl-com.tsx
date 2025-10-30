import Math from "../../../../components/Math/Math";
import MSuper from "../../../../components/Math/MSuper";
import Ket from "../../../../components/Math/Ket";
import MVar from "../../../../components/Math/MVar";
import MOp from "../../../../components/Math/MOp";
import type { Project } from "../../../../types/project-types";
import MNum from "../../../../components/Math/MNum";
import MSqRt from "../../../../components/Math/MSqRt";

const project: Project = {
  id: 'quantum-faster-than-light-communicators',
  title: 'Quantum Faster-Than-Light Communicators',
  worker: 'Nic',
  category: 'Theory',
  status: 'In Progress',
  startDate: '2025-10-20',
  lastUpdated: '2025-08-11',
  shortDescription: 'A presumably incorrect theory for how to create/enact FTL communication using quantum entanglement.',
  detailedDescription:
  <>
    <p>
      There is a quote attributed to Richard Feynman (which may actually be a paraphras of Niels Bohr) which
      says <q>If you think you understand quantum mechanics,
      you don't understand quantum mechanics.</q> Quite frankly, a good quote. Quantum physics is one of those
      things where, the deeper you dig, the stranger it gets. There never seems to be a "finally I understand
      everything" moment for it.
    </p>
    <p>
      Nevertheless, here I am attempting to use some fundemental, if a bit funky, mechanisms within
      quantum physics to create a "widely as impossible" theoretical device (or set of devices)
      which would allow Faster Than Light (FTL) transfer of information.
    </p>
    <p>
      You (or maybe I) need to realize that,
      within quantum mechanics (and thus the very core/basis of physics within our universe),
      gettin ANY information to move faster than the the speed of light. The speed of light (denoted as C)
      is also sometimes called the speed of causality, as it's really a max speed that ANY partical
      or interaction can theoretically
      propagate. Yet, the strange interactions of entanglement and the capability
      for vastly separated entangled particles to somehow resolve checks in ways that <i>feel</i> as
      though they've communicated their changes FTL leads one to want to pursue such effects as possible
      vectors to actually achieve such a noteworthy discovery. 
    </p>
    <p>
      FTL communications would allow a spacefaring species to maintain a semblance of unity, rather than
      being forced to transform into fragmented individual colonies that slowly update the disparate 
      pieces with news, inventions, and other colonial happenings. It's a piece that, without it we
      may find it hard to stay part of a galactic whole. 
    </p>
    <p>
      Am I the first to pursue FTL communications via entanglement? No! Will I be the last? No! Still,
      I'm going to pursue my curiosity and maybe learn more about quantum mechanics along the way.
    </p>  
  </>,
  images: [
  ],
  materials: [
    'Wrinkly grey fat in my head'
  ],
  tools: [
    'The internet'
  ],
  steps: [
    'asfd'
  ],
  walkthrough: <>
    <p>
      The plan here is to see if we can't cheat QM into letting us FTL communications. Communications don't
      need to be instant, just received and processed faster than light would reach the target, presumably
      light-days or light-years away.
    </p>
    <p>
      Bra-ket notation, also known as Dirac notation, is a mathematical shorthand used in quantum mechanics to 
      represent quantum states. It can get complicated, but for something like the quantum up/down spin states,
      the "ket" part of the notation is enough. You'll have two values that, squared and added together, make 1.
    </p>
    <p>
      For example, you may 
      use <Math>
        <MVar>α</MVar><Ket>0</Ket>
        <MOp>+</MOp>
        <MVar>β</MVar><Ket>1</Ket>
      </Math>,
      where <Math>
        <MSuper base={<MVar>α</MVar>} super={<MNum>2</MNum>} />
        <MOp>+</MOp>
        <MSuper base={<MVar>β</MVar>} super={<MNum>2</MNum>} />
        <MOp>=</MOp>
        <MNum>1</MNum>
      </Math>,
      where <Math><MSuper base={<MVar>α</MVar>} super={<MNum>2</MNum>} /></Math> represents
      the probability of measuring the state as 0 (spin down),
      and <Math><MSuper base={<MVar>β</MVar>} super={<MNum>2</MNum>} /></Math> represents the probability
      of measuring the state as 1 (spin up). So
      if <Math>
        <MSuper base={<MVar>α</MVar>} super={<MNum>2</MNum>} />
        <MOp>=</MOp>
        <MNum>0.75</MNum>
      </Math>,
      then <Math>
        <MSuper base={<MVar>β</MVar>} super={<MNum>2</MNum>} />
        <MOp>=</MOp>
        <MNum>0.25</MNum>
      </Math>, meaning when you measure the state, there's a 75% chance you'll find it spin down (0)
      and a 25% chance you'll find it spin up (1). At this point you can sort of think of the states as
      binary 0 and 1, and ignore the spin up/down aspect. This is called a qbit (quantum-bit), due to the
      similarity to classical binary bits.
      Additionally, since the probabilities must
      add up to 1, knowing one probability automatically gives you the other. Whenever we talk about a single 2-quantum-state
      situation, we really only need <b>one</b> of the probabilities to fully describe the state.
    </p>
    <p>
      An important aspect of this superposition is that, once you measure the state, it "locks in" to whatever measurement
      you got. So
      a <Math>
        <MSqRt><MNum>0.5</MNum></MSqRt>
        <Ket>0</Ket>
      </Math> state has a 50/50 chance of resolving to a 0 or 1 when measured. If you measure and get a 1,
      you will now <i>always</i> measure a 1 until you do something to put the state back into superposition.
      It's effectively been set to <Math>
        <MSqRt><MNum>0</MNum></MSqRt>
        <Ket>0</Ket>
      </Math> or <Math>
        <MSqRt><MNum>1</MNum></MSqRt>
        <Ket>1</Ket>
      </Math>.
    </p>
    <p>
      In cases where we have sets of states, we can't make such simplifications. For example, knowing the
      multiplier for a <Ket>00</Ket> state in a 2-qbit system doesn't tell us anything about the other three states
      (<Ket>01</Ket>, <Ket>10</Ket>, and <Ket>11</Ket>).
    </p>
    <p>
      Another important aspect of quantum mechanics is entanglement. When two (or more) qbits become entangled,
      their states become linked such that the state of one qbit directly affects the state of the other(s),
      no matter the distance between them. For example, if we have an entangled pair of qbits, and one
      is in the
      state <Math>
        <MSqRt><MVar>x</MVar></MSqRt>
        <Ket>0</Ket>
      </Math>,
      then the other qbit can be thought of as in the
      state <Math>
        <MSqRt><MVar>x</MVar></MSqRt>
        <Ket>1</Ket>
      </Math> (noting the change from 0 ket to 1 ket).


    </p>
    {/* <p>
      For simplicity, we will start with one-way communication — A Quantum Sender and a Quantum Receiver.
      These devices are not <i>actually</i> sending or receiving, but those are familiar terms when communicating.
      It might be helpful to also consider the Quantum Sender as a Quantum Setter and the Quantum Reciever
      as a Quantum Reader. For the sake of this theory, we will assume that the two devices are pre-loaded with
      a near-infinite number of entangled qbit pairs. Each device has one half of each entangled pair, kept in the
      same order so we know which qbits correspond to each other.
    </p> */}
    <p>
      Ok, so what can we do with this? Turn our measurment alignment on the Q-Send to be 45/2 degres OR 45/2 + 45 degrees.
      This makes it so that the measurement probabilitiies are shifted, shifting the state using the ORIGINAL
      measurement tool to be either slightly more likely to be 0 or slightly more likely to be 1 depending on choice.
      The Q-Receiver, then, is measured using the original measurement tool (0/90 degrees). By collecting statistics
      on a large number of entangled pairs, the Q-Receiver can determine whether the Q-Sender measured at 45/2 degrees
      or 45/2 + 45 degrees based on the slight bias in the results. This allows the Q-Sender to send a binary message
      (0 or 1) to the Q-Receiver faster than light.
    </p>
    <p>
      Clocks and shit.
    </p>
  </>,
  summary: {
    challenges: [
      
    ],
    learnings: [
      
    ],
    nextSteps: [
      
    ]
  },
};

export default project;
