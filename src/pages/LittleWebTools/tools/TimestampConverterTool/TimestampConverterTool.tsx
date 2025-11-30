import { useState, useEffect } from 'react';

export default function TimestampConverterTool() {
  const [timestamp, setTimestamp] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = Number(timestamp);
      if (isNaN(ts)) {
        alert('Invalid timestamp');
        return;
      }
      // Handle both seconds and milliseconds
      const date = new Date(ts > 9999999999 ? ts : ts * 1000);
      setDateTime(date.toISOString().slice(0, 16));
    } catch {
      alert('Error converting timestamp');
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        alert('Invalid date');
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch {
      alert('Error converting date');
    }
  };

  const useCurrentTime = () => {
    const now = Date.now();
    setTimestamp(Math.floor(now / 1000).toString());
    setDateTime(new Date(now).toISOString().slice(0, 16));
  };

  const formatDate = (ts: number): string => {
    const date = new Date(ts);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="tool-content">
      <h3>Timestamp Converter</h3>
      
      <div className="tool-section">
        <label className="tool-label">Current Unix Timestamp</label>
        <div className="tool-output" style={{ minHeight: 'auto', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {Math.floor(currentTimestamp / 1000)}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            {formatDate(currentTimestamp)}
          </div>
        </div>
        <button className="tool-button" onClick={useCurrentTime} style={{ marginTop: '0.5rem' }}>
          Use Current Time
        </button>
      </div>

      <div className="tool-section">
        <label className="tool-label">Unix Timestamp (seconds)</label>
        <input
          type="text"
          className="tool-input"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1699564800"
        />
        <button 
          className="tool-button" 
          onClick={timestampToDate} 
          disabled={!timestamp}
          style={{ marginTop: '0.5rem' }}
        >
          Convert to Date
        </button>
      </div>

      <div className="tool-section">
        <label className="tool-label">Date & Time</label>
        <input
          type="datetime-local"
          className="tool-input"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button 
          className="tool-button" 
          onClick={dateToTimestamp} 
          disabled={!dateTime}
          style={{ marginTop: '0.5rem' }}
        >
          Convert to Timestamp
        </button>
      </div>

      {timestamp && (
        <div className="tool-section">
          <label className="tool-label">Readable Format</label>
          <div className="tool-output" style={{ minHeight: 'auto' }}>
            {formatDate(Number(timestamp) > 9999999999 ? Number(timestamp) : Number(timestamp) * 1000)}
          </div>
        </div>
      )}
    </div>
  );
}
