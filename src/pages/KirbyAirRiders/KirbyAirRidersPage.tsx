import Page from '../Page';
import './KirbyAirRidersPage.css';

type CourseTime = {
  course: string;
  bestTime: string | null;
};

type GameMode = {
  name: string;
  courses: CourseTime[];
};

const airRidersCourses: CourseTime[] = [
  { course: 'Floria Fields', bestTime: null },
  { course: 'Waveflow Waters', bestTime: null },
  { course: 'Airtopia Ruins', bestTime: null },
  { course: 'Crystalline Fissure', bestTime: null },
  { course: 'Steamgust Forge', bestTime: null },
  { course: 'Cavernous Corners', bestTime: null },
  { course: 'Cyberion Highway', bestTime: null },
  { course: 'Mount Amberfalls', bestTime: null },
  { course: 'Galactic Nova', bestTime: null },
];

const airRideClassicCourses: CourseTime[] = [
  { course: 'Fantasy Meadows', bestTime: null },
  { course: 'Celestial Valley', bestTime: null },
  { course: 'Frozen Hillside', bestTime: null },
  { course: 'Sky Sands', bestTime: null },
  { course: 'Machine Passage', bestTime: null },
  { course: 'Magma Flows', bestTime: null },
  { course: 'Beanstalk Park', bestTime: null },
  { course: 'Nebula Belt', bestTime: null },
  { course: 'Checker Knights', bestTime: null },
];

const topRideCourses: CourseTime[] = [
  { course: 'Green', bestTime: null },
  { course: 'Sand', bestTime: null },
  { course: 'Sky', bestTime: null },
  { course: 'Fire', bestTime: null },
  { course: 'Light', bestTime: null },
  { course: 'Water', bestTime: null },
];

const gameModes: GameMode[] = [
  { name: 'Air Ride', courses: airRidersCourses },
  // { name: 'Top Ride', courses: topRideCourses },
];

export default function KirbyAirRidersPage() {
  return (
    <Page>
      <div className="kar-header">
        <h1>Kirby Air Ride</h1>
        <p className="kar-subtitle">Speedrun time tracker — find your personal bests!</p>
      </div>

      <div className="kar-modes">
        {gameModes.map((mode) => (
          <section key={mode.name} className="kar-mode-section">
            <h2>{mode.name}</h2>
            <table className="kar-times-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Best Time</th>
                </tr>
              </thead>
              <tbody>
                {mode.courses.map((entry) => (
                  <tr key={entry.course}>
                    <td>{entry.course}</td>
                    <td className={entry.bestTime ? 'kar-time' : 'kar-time-empty'}>
                      {entry.bestTime ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        <section className="kar-mode-section">
          <h2>City Trial</h2>
          <p className="kar-placeholder">
            City Trial is a sandbox mode — track your high scores and stadium records here soon!
          </p>
        </section>
      </div>
    </Page>
  );
}
