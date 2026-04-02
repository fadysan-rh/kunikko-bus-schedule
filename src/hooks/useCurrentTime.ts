import { useState, useEffect } from 'react';
import { getCurrentMinutes } from '../utils/time';

export function useCurrentTime(intervalMs: number = 30000): number {
  const [minutes, setMinutes] = useState(getCurrentMinutes);

  useEffect(() => {
    const id = setInterval(() => setMinutes(getCurrentMinutes()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return minutes;
}
