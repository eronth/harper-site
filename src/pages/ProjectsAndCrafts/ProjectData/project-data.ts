import type { Project } from '../../../types/project-types.ts';
// import leatherBeetleBag from './LeatherBeetleBag/leather-beetle-bag.tsx';
import flightThrottleRepair from './FlightThrottleControllerRepair/flight-throttle-controller-repair.tsx';
import quantumFtlCommunicator from './QFtlCom/q-ftl-com.tsx';

const projects: Project[] = [
  // { ...leatherBeetleBag },
  { ...flightThrottleRepair },
  {...quantumFtlCommunicator}
];

export default projects;
