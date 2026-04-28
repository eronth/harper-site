import { useEffect, useRef } from 'react';
import { vehicles, vehicleIcon } from './kar-vehicles';
import type { VehicleTimes } from './kar-vehicles';
import './CourseDetailModal.css';

interface VehicleTimesGridProps {
  times: VehicleTimes;
  onUpdate: (vehicleId: string, field: 'bestTime' | 'bestLap', value: string) => void;
}

export function VehicleTimesGrid({ times, onUpdate }: VehicleTimesGridProps) {
  return (
    <div className="kar-vehicles-grid">
      {vehicles.map((vehicle) => {
        const vehicleTimes = times[vehicle.id] ?? { bestTime: '', bestLap: '' };
        return (
          <div key={vehicle.id} className="kar-vehicle-card">
            <img
              src={vehicleIcon(vehicle.iconFile)}
              alt={vehicle.name}
              className="kar-vehicle-icon"
            />
            <span className="kar-vehicle-name">{vehicle.name}</span>
            <label className="kar-time-field">
              <span>Best Time (Race)</span>
              <input
                type="text"
                placeholder="0:00.00"
                value={vehicleTimes.bestTime}
                onChange={(e) => onUpdate(vehicle.id, 'bestTime', e.target.value)}
              />
            </label>
            <label className="kar-time-field">
              <span>Best Lap (Time Trial)</span>
              <input
                type="text"
                placeholder="0:00.00"
                value={vehicleTimes.bestLap}
                onChange={(e) => onUpdate(vehicle.id, 'bestLap', e.target.value)}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

interface CourseDetailModalProps {
  course: string;
  times: VehicleTimes;
  onClose: () => void;
  onUpdate: (vehicleId: string, field: 'bestTime' | 'bestLap', value: string) => void;
}

export function CourseDetailModal({ course, times, onClose, onUpdate }: CourseDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog ref={dialogRef} className="kar-modal" onClick={handleDialogClick} onClose={onClose}>
      <div className="kar-modal-inner">
        <div className="kar-modal-header">
          <h2>{course}</h2>
          <button className="kar-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <VehicleTimesGrid times={times} onUpdate={onUpdate} />
      </div>
    </dialog>
  );
}
