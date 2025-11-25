import { useState, useMemo } from 'react';
import WebTool from '../../WebTool';
import './CronExpressionBuilder.css';

type CronMode = 'simple' | 'advanced';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type TimeOptions = 'minute' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function CronExpressionBuilder() {
  const [mode, setMode] = useState<CronMode>('simple');
  const [customExpression, setCustomExpression] = useState('* * * * *');
  
  // Simple mode state
  const [simpleMode, setSimpleMode] = useState<TimeOptions>('hourly');
  const [everyMinutes, setEveryMinutes] = useState(15);
  const [hourlyMinute, setHourlyMinute] = useState(0);
  const [dailyTime, setDailyTime] = useState({ hour: 9, minute: 0 });
  const [weeklyDay, setWeeklyDay] = useState(1); // Monday
  const [weeklyTime, setWeeklyTime] = useState({ hour: 9, minute: 0 });
  const [monthlyDay, setMonthlyDay] = useState(1);
  const [monthlyTime, setMonthlyTime] = useState({ hour: 9, minute: 0 });
  const [yearlyMonth, setYearlyMonth] = useState(0); // January
  const [yearlyDay, setYearlyDay] = useState(1);
  const [yearlyTime, setYearlyTime] = useState({ hour: 9, minute: 0 });

  const generateSimpleCron = (): string => {
    switch (simpleMode) {
      case 'minute':
        return `*/${everyMinutes} * * * *`;
      case 'hourly':
        return `${hourlyMinute} * * * *`;
      case 'daily':
        return `${dailyTime.minute} ${dailyTime.hour} * * *`;
      case 'weekly':
        return `${weeklyTime.minute} ${weeklyTime.hour} * * ${weeklyDay}`;
      case 'monthly':
        return `${monthlyTime.minute} ${monthlyTime.hour} ${monthlyDay} * *`;
      case 'yearly':
        return `${yearlyTime.minute} ${yearlyTime.hour} ${yearlyDay} ${yearlyMonth + 1} *`;
      default:
        return '* * * * *';
    }
  };

  const cronExpression = mode === 'simple' ? generateSimpleCron() : customExpression;

  const parseCron = useMemo(() => {
    const parts = cronExpression.split(' ');
    if (parts.length !== 5) {
      return { valid: false, description: 'Invalid cron expression (must have 5 parts)' };
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

    try {
      const descriptions: string[] = [];

      // Parse minute
      if (minute === '*') {
        descriptions.push('every minute');
      } else if (minute.startsWith('*/')) {
        const interval = minute.slice(2);
        descriptions.push(`every ${interval} minute${interval === '1' ? '' : 's'}`);
      } else if (minute.includes(',')) {
        descriptions.push(`at minute${minute.split(',').length > 1 ? 's' : ''} ${minute}`);
      } else if (minute.includes('-')) {
        descriptions.push(`between minutes ${minute}`);
      } else {
        descriptions.push(`at minute ${minute}`);
      }

      // Parse hour
      if (hour === '*') {
        descriptions.push('of every hour');
      } else if (hour.startsWith('*/')) {
        const interval = hour.slice(2);
        descriptions.push(`every ${interval} hour${interval === '1' ? '' : 's'}`);
      } else if (hour.includes(',')) {
        descriptions.push(`at hour${hour.split(',').length > 1 ? 's' : ''} ${hour}`);
      } else if (hour.includes('-')) {
        descriptions.push(`between hours ${hour}`);
      } else {
        descriptions.push(`at ${hour}:${minute.padStart(2, '0')}`);
      }

      // Parse day of month
      if (dayOfMonth !== '*' && dayOfMonth !== '?') {
        if (dayOfMonth.startsWith('*/')) {
          const interval = dayOfMonth.slice(2);
          descriptions.push(`every ${interval} day${interval === '1' ? '' : 's'}`);
        } else if (dayOfMonth.includes(',')) {
          descriptions.push(`on day${dayOfMonth.split(',').length > 1 ? 's' : ''} ${dayOfMonth}`);
        } else if (dayOfMonth.includes('-')) {
          descriptions.push(`on days ${dayOfMonth}`);
        } else {
          descriptions.push(`on day ${dayOfMonth}`);
        }
      }

      // Parse month
      if (month !== '*') {
        if (month.startsWith('*/')) {
          const interval = month.slice(2);
          descriptions.push(`every ${interval} month${interval === '1' ? '' : 's'}`);
        } else if (month.includes(',')) {
          const months = month.split(',').map(m => MONTHS[parseInt(m) - 1] || m).join(', ');
          descriptions.push(`in ${months}`);
        } else if (month.includes('-')) {
          descriptions.push(`in months ${month}`);
        } else {
          const monthNum = parseInt(month);
          descriptions.push(`in ${MONTHS[monthNum - 1] || month}`);
        }
      }

      // Parse day of week
      if (dayOfWeek !== '*' && dayOfWeek !== '?') {
        if (dayOfWeek.startsWith('*/')) {
          const interval = dayOfWeek.slice(2);
          descriptions.push(`every ${interval} day${interval === '1' ? '' : 's'} of the week`);
        } else if (dayOfWeek.includes(',')) {
          const days = dayOfWeek.split(',').map(d => DAYS_OF_WEEK[parseInt(d)] || d).join(', ');
          descriptions.push(`on ${days}`);
        } else if (dayOfWeek.includes('-')) {
          descriptions.push(`on days ${dayOfWeek}`);
        } else {
          const dayNum = parseInt(dayOfWeek);
          descriptions.push(`on ${DAYS_OF_WEEK[dayNum] || dayOfWeek}`);
        }
      }

      let description = descriptions.join(', ');
      description = description.charAt(0).toUpperCase() + description.slice(1);

      return {
        valid: true,
        description,
      };
    } catch {
      return { valid: false, description: 'Unable to parse cron expression' };
    }
  }, [cronExpression]);

  const nextExecutions = useMemo(() => {
    if (!parseCron.valid) return [];

    try {
      const parts = cronExpression.split(' ');
      const [minutePart, hourPart, dayPart, monthPart, dowPart] = parts;

      const now = new Date();
      const executions: Date[] = [];
      let current = new Date(now);

      const matchesCron = (date: Date): boolean => {
        const matches = {
          minute: minutePart === '*' || 
                  (minutePart.startsWith('*/') && date.getMinutes() % parseInt(minutePart.slice(2)) === 0) ||
                  minutePart.split(',').includes(date.getMinutes().toString()) ||
                  parseInt(minutePart) === date.getMinutes(),
          hour: hourPart === '*' || 
                (hourPart.startsWith('*/') && date.getHours() % parseInt(hourPart.slice(2)) === 0) ||
                hourPart.split(',').includes(date.getHours().toString()) ||
                parseInt(hourPart) === date.getHours(),
          day: dayPart === '*' || 
               dayPart === '?' ||
               dayPart.split(',').includes(date.getDate().toString()) ||
               parseInt(dayPart) === date.getDate(),
          month: monthPart === '*' || 
                 monthPart.split(',').includes((date.getMonth() + 1).toString()) ||
                 parseInt(monthPart) === date.getMonth() + 1,
          dow: dowPart === '*' || 
               dowPart === '?' ||
               dowPart.split(',').includes(date.getDay().toString()) ||
               parseInt(dowPart) === date.getDay(),
        };

        return matches.minute && matches.hour && matches.day && matches.month && matches.dow;
      };

      // Find next 5 execution times (with safety limit)
      let iterations = 0;
      while (executions.length < 5 && iterations < 10000) {
        current = new Date(current.getTime() + 60000); // Add 1 minute
        if (matchesCron(current)) {
          executions.push(new Date(current));
        }
        iterations++;
      }

      return executions;
    } catch {
      return [];
    }
  }, [cronExpression, parseCron.valid]);

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const copyCron = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = cronExpression;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <WebTool css="cron-builder-tool">
      <h3>Cron Expression Builder</h3>
      <p>Build and test cron expressions with a visual interface or custom syntax.</p>

      <div className="mode-selector">
        <button
          className={`mode-button ${mode === 'simple' ? 'active' : ''}`}
          onClick={() => setMode('simple')}
        >
          Simple Mode
        </button>
        <button
          className={`mode-button ${mode === 'advanced' ? 'active' : ''}`}
          onClick={() => setMode('advanced')}
        >
          Advanced Mode
        </button>
      </div>

      {mode === 'simple' ? (
        <div className="simple-mode">
          <div className="frequency-selector">
            <label>Frequency:</label>
            <select value={simpleMode} onChange={(e) => setSimpleMode(e.target.value as TimeOptions)}>
              <option value="minute">Every N Minutes</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="frequency-options">
            {simpleMode === 'minute' && (
              <div className="option-group">
                <label>Every</label>
                <input
                  type="number"
                  min="1"
                  max="59"
                  value={everyMinutes}
                  onChange={(e) => setEveryMinutes(parseInt(e.target.value) || 1)}
                />
                <span>minute(s)</span>
              </div>
            )}

            {simpleMode === 'hourly' && (
              <div className="option-group">
                <label>At minute</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={hourlyMinute}
                  onChange={(e) => setHourlyMinute(parseInt(e.target.value) || 0)}
                />
              </div>
            )}

            {simpleMode === 'daily' && (
              <div className="option-group">
                <label>At</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={dailyTime.hour}
                  onChange={(e) => setDailyTime({ ...dailyTime, hour: parseInt(e.target.value) || 0 })}
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={dailyTime.minute}
                  onChange={(e) => setDailyTime({ ...dailyTime, minute: parseInt(e.target.value) || 0 })}
                />
              </div>
            )}

            {simpleMode === 'weekly' && (
              <div className="option-group">
                <label>On</label>
                <select value={weeklyDay} onChange={(e) => setWeeklyDay(parseInt(e.target.value))}>
                  {DAYS_OF_WEEK.map((day, index) => (
                    <option key={index} value={index}>{day}</option>
                  ))}
                </select>
                <label>at</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={weeklyTime.hour}
                  onChange={(e) => setWeeklyTime({ ...weeklyTime, hour: parseInt(e.target.value) || 0 })}
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={weeklyTime.minute}
                  onChange={(e) => setWeeklyTime({ ...weeklyTime, minute: parseInt(e.target.value) || 0 })}
                />
              </div>
            )}

            {simpleMode === 'monthly' && (
              <div className="option-group">
                <label>On day</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={monthlyDay}
                  onChange={(e) => setMonthlyDay(parseInt(e.target.value) || 1)}
                />
                <label>at</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={monthlyTime.hour}
                  onChange={(e) => setMonthlyTime({ ...monthlyTime, hour: parseInt(e.target.value) || 0 })}
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={monthlyTime.minute}
                  onChange={(e) => setMonthlyTime({ ...monthlyTime, minute: parseInt(e.target.value) || 0 })}
                />
              </div>
            )}

            {simpleMode === 'yearly' && (
              <div className="option-group">
                <label>On</label>
                <select value={yearlyMonth} onChange={(e) => setYearlyMonth(parseInt(e.target.value))}>
                  {MONTHS.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={yearlyDay}
                  onChange={(e) => setYearlyDay(parseInt(e.target.value) || 1)}
                />
                <label>at</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={yearlyTime.hour}
                  onChange={(e) => setYearlyTime({ ...yearlyTime, hour: parseInt(e.target.value) || 0 })}
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={yearlyTime.minute}
                  onChange={(e) => setYearlyTime({ ...yearlyTime, minute: parseInt(e.target.value) || 0 })}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="advanced-mode">
          <label htmlFor="cron-input">Cron Expression:</label>
          <div className="cron-input-wrapper">
            <input
              id="cron-input"
              type="text"
              value={customExpression}
              onChange={(e) => setCustomExpression(e.target.value)}
              placeholder="* * * * *"
              className={parseCron.valid ? '' : 'invalid'}
            />
            <button className="tool-button copy-button" onClick={copyCron}>
              Copy
            </button>
          </div>
          <div className="cron-format-help">
            <span>Format:</span>
            <code>minute hour day month day-of-week</code>
          </div>
        </div>
      )}

      <div className="cron-output">
        <div className="cron-display">
          <label>Cron Expression:</label>
          <div className="cron-value">
            <code>{cronExpression}</code>
            <button className="tool-button copy-button" onClick={copyCron}>
              Copy
            </button>
          </div>
        </div>

        <div className={`cron-description ${parseCron.valid ? '' : 'invalid'}`}>
          <label>Human Readable:</label>
          <p>{parseCron.description}</p>
        </div>
      </div>

      {parseCron.valid && nextExecutions.length > 0 && (
        <div className="next-executions">
          <h4>Next 5 Executions:</h4>
          <ul>
            {nextExecutions.map((date, index) => (
              <li key={index}>
                <span className="execution-number">{index + 1}.</span>
                <span className="execution-time">{formatDateTime(date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cron-reference">
        <h4>Quick Reference</h4>
        <div className="reference-grid">
          <div className="reference-item">
            <strong>*</strong>
            <span>Any value</span>
          </div>
          <div className="reference-item">
            <strong>,</strong>
            <span>Value list separator</span>
          </div>
          <div className="reference-item">
            <strong>-</strong>
            <span>Range of values</span>
          </div>
          <div className="reference-item">
            <strong>/</strong>
            <span>Step values</span>
          </div>
        </div>
        <div className="example-expressions">
          <div className="example">
            <code>0 0 * * *</code>
            <span>Daily at midnight</span>
          </div>
          <div className="example">
            <code>*/15 * * * *</code>
            <span>Every 15 minutes</span>
          </div>
          <div className="example">
            <code>0 9-17 * * 1-5</code>
            <span>Every hour 9am-5pm, Mon-Fri</span>
          </div>
        </div>
      </div>
    </WebTool>
  );
}
