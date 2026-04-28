const iconModules = import.meta.glob(
  '../../../assets/kar/stars/*.png',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

export function vehicleIcon(file: string): string {
  return iconModules[`../../../assets/kar/stars/${file}`];
}

export type VehicleTimes = Record<string, { bestTime: string; bestLap: string }>;

export type Vehicle = { id: string; name: string; iconFile: string };

export const vehicles: Vehicle[] = [
  { id: 'warp-star',       name: 'Warp Star',        iconFile: 'KARs_Warp_Star_Icon.png' },
  { id: 'winged-star',     name: 'Winged Star',       iconFile: 'KARs_Winged_Star_Icon.png' },
  { id: 'compact-star',    name: 'Compact Star',      iconFile: 'KARs_Compact_Star_Icon.png' },
  { id: 'formula-star',    name: 'Formula Star',      iconFile: 'KARs_Formula_Star_Icon.png' },
  { id: 'turbo-star',      name: 'Turbo Star',        iconFile: 'KARs_Turbo_Star_Icon.png' },
  { id: 'slick-star',      name: 'Slick Star',        iconFile: 'KARs_Slick_Star_Icon.png' },
  { id: 'rocket-star',     name: 'Rocket Star',       iconFile: 'KARs_Rocket_Star_Icon.png' },
  { id: 'jet-star',        name: 'Jet Star',          iconFile: 'KARs_Jet_Star_Icon.png' },
  { id: 'swerve-star',     name: 'Swerve Star',       iconFile: 'KARs_Swerve_Star_Icon.png' },
  { id: 'bulk-star',       name: 'Bulk Star',         iconFile: 'KARs_Bulk_Star_Icon.png' },
  { id: 'shadow-star',     name: 'Shadow Star',       iconFile: 'KARs_Shadow_Star_Icon.png' },
  { id: 'wagon-star',      name: 'Wagon Star',        iconFile: 'KARs_Wagon_Star_Icon.png' },
  { id: 'paper-star',      name: 'Paper Star',        iconFile: 'KARs_Paper_Star_Icon.png' },
  { id: 'hop-star',        name: 'Hop Star',          iconFile: 'KARs_Hop_Star_Icon.png' },
  { id: 'tank-star',       name: 'Tank Star',         iconFile: 'KARs_Tank_Star_Icon.png' },
  { id: 'vampire-star',    name: 'Vampire Star',      iconFile: 'KARs_Vampire_Star_Icon.png' },
  { id: 'transform-star',  name: 'Transform (Star)',  iconFile: 'KARs_Transform_Star_Form_Icon.png' },
  { id: 'transform-bike',  name: 'Transform (Bike)',  iconFile: 'KARs_Transform_Bike_Form_Icon.png' },
  { id: 'wheelie-bike',    name: 'Wheelie Bike',      iconFile: 'KARs_Wheelie_Bike_Icon.png' },
  { id: 'wheelie-scooter', name: 'Wheelie Scooter',   iconFile: 'KARs_Wheelie_Scooter_Icon.png' },
  { id: 'rex-wheelie',     name: 'Rex Wheelie',       iconFile: 'KARs_Rex_Wheelie_Icon.png' },
  { id: 'chariot',         name: 'Chariot',           iconFile: 'KARs_Chariot_Icon.png' },
  { id: 'battle-chariot',  name: 'Battle Chariot',    iconFile: 'KARs_Battle_Chariot_Icon.png' },
  { id: 'bull-tank',       name: 'Bull Tank',         iconFile: 'KARs_Bull_Tank_Icon.png' },
];

export const vehicleCount = vehicles.length;

function parseTime(s: string): number {
  if (!s.trim()) return Infinity;
  const match = s.match(/^(?:(\d+):)?(\d+)(?:\.(\d+))?$/);
  if (!match) return Infinity;
  const minutes = match[1] ? parseInt(match[1]) : 0;
  const seconds = parseInt(match[2]);
  const centis = match[3] ? parseInt(match[3].padEnd(2, '0').slice(0, 2)) : 0;
  return minutes * 60 + seconds + centis / 100;
}

export type BestLapInfo = { iconUrl: string; name: string; time: string; isAvg: boolean };

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const centis = Math.round((s % 1) * 100);
  const wholeS = Math.floor(s);
  const mm = String(centis).padStart(2, '0');
  return m > 0 ? `${m}:${String(wholeS).padStart(2, '0')}.${mm}` : `${wholeS}.${mm}`;
}

export function getBestLapInfo(times: VehicleTimes, laps: number): BestLapInfo | null {
  let best: BestLapInfo | null = null;
  let bestVal = Infinity;
  for (const vehicle of vehicles) {
    const lapTime = times[vehicle.id]?.bestLap ?? '';
    const raceTime = times[vehicle.id]?.bestTime ?? '';
    const lapVal = parseTime(lapTime);
    const avgVal = parseTime(raceTime) / laps;
    const useLap = lapVal <= avgVal;
    const val = useLap ? lapVal : avgVal;
    if (val < bestVal) {
      bestVal = val;
      best = {
        iconUrl: vehicleIcon(vehicle.iconFile),
        name: vehicle.name,
        time: useLap ? lapTime : formatTime(avgVal),
        isAvg: !useLap,
      };
    }
  }
  return best;
}
