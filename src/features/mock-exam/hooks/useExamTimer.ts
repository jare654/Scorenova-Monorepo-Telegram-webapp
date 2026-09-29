import { useState, useEffect, useCallback } from 'react';

export function useExamTimer(durationMinutes: number, onTimeUp: () => void) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return {
    timeLeft,
    isWarning: timeLeft <= 300 && timeLeft > 60, // 5 mins
    isCritical: timeLeft <= 60, // 1 min
  };
}
