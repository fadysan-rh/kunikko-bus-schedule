import { useMemo } from 'react';
import { timetable } from '../data/timetable';
import { findNextBuses, resolveStopIds } from '../utils/routeFinder';
import type { BusOption } from '../types';

export function useBusSearch(
  originId: string | null,
  destinationId: string | null,
  now: number
): BusOption[] {
  return useMemo(() => {
    if (!originId || !destinationId || originId === destinationId) return [];
    const originIds = resolveStopIds(originId);
    const destIds = resolveStopIds(destinationId);
    if (originIds.some(id => destIds.includes(id))) return [];
    return findNextBuses(originIds, destIds, now, timetable, 5);
  }, [originId, destinationId, now]);
}
