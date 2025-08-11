import type { Project } from '../../../types/project-types';
import leatherBeetleBag from './LeatherBeetleBag/leather-beetle-bag.tsx';
import flightThrottleRepair from './FlightThrottleControllerRepair/flight-throttle-controller-repair.tsx';

const projects: Project[] = [
  { ...leatherBeetleBag },
  { ...flightThrottleRepair },
];

export default projects;
