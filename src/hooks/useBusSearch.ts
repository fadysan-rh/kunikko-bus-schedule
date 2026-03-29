import { useMemo } from 'react';
import { timetable } from '../data/timetable';
import { findNextBuses } from '../utils/routeFinder';
import type { BusOption } from '../types';

export function useBusSearch(
  originId: string | null,
  destinationId: string | null,
  now: number
): BusOption[] {
  return useMemo(() => {
    if (!originId || !destinationId || originId === destinationId) return [];
    return findNextBuses(originId, destinationId, now, timetable, 5);
  }, [originId, destinationId, now]);
}
