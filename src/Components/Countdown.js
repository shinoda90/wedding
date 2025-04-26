import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

const targetDate = DateTime.fromObject(
  { year: 2025, month: 12, day: 27, hour: 16, minute: 0 },
  { zone: 'America/El_Salvador' }
);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeRemaining() {
    const now = DateTime.now().setZone('America/El_Salvador');
    const diff = targetDate.diff(now, ['months', 'days', 'hours', 'minutes']).toObject();

    return {
      months: Math.floor(diff.months || 0),
      days: Math.floor(diff.days || 0),
      hours: Math.floor(diff.hours || 0),
      minutes: Math.floor(diff.minutes || 0),
    };
  }
  const countdownItems = [
    { value: timeLeft.months, label: t('countdown.months') },
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
  ];

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {countdownItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-purple-100 text-purple-800 rounded-xl p-4 shadow-md"
        >
          <span className="countdown font-mono text-4xl">
            <span style={{ '--value': `${item.value}` }}>{item.value}</span>
          </span>
          <span className="text-xs mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
