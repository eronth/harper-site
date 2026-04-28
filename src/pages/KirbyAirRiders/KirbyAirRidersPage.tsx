import { useState } from 'react';
import Page from '../Page';
import { CourseDetailModal } from './CourseDetailModal/CourseDetailModal';
import { vehicleCount, getBestLapInfo } from './CourseDetailModal/kar-vehicles';
import type { VehicleTimes, BestLapInfo } from './CourseDetailModal/kar-vehicles';
import './KirbyAirRidersPage.css';

type Course = { course: string; laps: number; };

type AllCourseTimes = Record<string, VehicleTimes>;

const newCourses: Course[] = [
  { course: 'Floria Fields', laps: 3 },
  { course: 'Waveflow Waters', laps: 3 },
  { course: 'Airtopia Ruins', laps: 3 },
  { course: 'Crystalline Fissure', laps: 3 },
  { course: 'Steamgust Forge', laps: 3 },
  { course: 'Cavernous Corners', laps: 3 },
  { course: 'Cyberion Highway', laps: 3 },
  { course: 'Mount Amberfalls', laps: 3 },
  { course: 'Galactic Nova', laps: 3 },
];

const classicCourses: Course[] = [
  { course: 'Fantasy Meadows', laps: 3 },
  { course: 'Celestial Valley', laps: 3 },
  { course: 'Frozen Hillside', laps: 3 },
  { course: 'Sky Sands', laps: 3 },
  { course: 'Machine Passage', laps: 3 },
  { course: 'Magma Flows', laps: 3 },
  { course: 'Beanstalk Park', laps: 3 },
  { course: 'Nebula Belt', laps: 3 },
  { course: 'Checker Knights', laps: 3 },
];

function getSetCount(times: VehicleTimes | undefined): number {
  if (!times) return 0;
  return Object.values(times).filter((t) => t.bestTime || t.bestLap).length;
}

function CourseRow({
  entry,
  courseTimes,
  onClick,
}: {
  entry: Course;
  courseTimes: VehicleTimes | undefined;
  onClick: () => void;
}) {
  const count = getSetCount(courseTimes);
  const bestLap: BestLapInfo | null = courseTimes ? getBestLapInfo(courseTimes, entry.laps) : null;
  return (
    <tr className="kar-course-row" onClick={onClick}>
      <td>{entry.course}</td>
      <td className={count > 0 ? 'kar-time' : 'kar-time-empty'}>
        {count > 0 ? `${count} / ${vehicleCount}` : '—'}
      </td>
      <td className="kar-best-lap-cell">
        {bestLap ? (
          <span className="kar-best-lap">
            <img src={bestLap.iconUrl} alt={bestLap.name} className="kar-best-lap-icon" title={bestLap.name} />
            <span className="kar-time">{bestLap.time}</span>
            {bestLap.isAvg && <span className="kar-best-lap-avg">(avg)</span>}
          </span>
        ) : (
          <span className="kar-time-empty">—</span>
        )}
      </td>
    </tr>
  );
}

export default function KirbyAirRidersPage() {
  const [allTimes, setAllTimes] = useState<AllCourseTimes>({});
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  function handleUpdate(
    course: string,
    vehicleId: string,
    field: 'bestTime' | 'bestLap',
    value: string
  ) {
    setAllTimes((prev) => ({
      ...prev,
      [course]: {
        ...prev[course],
        [vehicleId]: {
          ...prev[course]?.[vehicleId],
          [field]: value,
        },
      },
    }));
  }

  return (
    <Page>
      <div className="kar-header">
        <h1>Kirby Air Riders</h1>
        <p className="kar-subtitle">Speedrun time tracker — find your personal bests!</p>
      </div>

      <section className="kar-mode-section">
        <h2>Air Ride</h2>
        <table className="kar-times-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Vehicles Set</th>
              <th>Best Lap</th>
            </tr>
          </thead>
          <tbody>
            <tr className="kar-section-divider">
              <td colSpan={3}>New Courses</td>
            </tr>
            {newCourses.map((entry) => (
              <CourseRow
                key={entry.course}
                entry={entry}
                courseTimes={allTimes[entry.course]}
                onClick={() => setSelectedCourse(entry.course)}
              />
            ))}
            <tr className="kar-section-divider">
              <td colSpan={3}>Classic Courses</td>
            </tr>
            {classicCourses.map((entry) => (
              <CourseRow
                key={entry.course}
                entry={entry}
                courseTimes={allTimes[entry.course]}
                onClick={() => setSelectedCourse(entry.course)}
              />
            ))}
          </tbody>
        </table>
      </section>

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          times={allTimes[selectedCourse] ?? {}}
          onClose={() => setSelectedCourse(null)}
          onUpdate={(vehicleId, field, value) =>
            handleUpdate(selectedCourse, vehicleId, field, value)
          }
        />
      )}
    </Page>
  );
}
