import type { TimetableData, BusOption, DirectionId, SelectableItem } from '../types';
import { stationGroups } from '../data/stationGroups';

/** Resolve a selectable ID to one or more stop IDs */
export function resolveStopIds(id: string): string[] {
  const group = stationGroups.find(g => g.id === id);
  return group ? group.stopIds : [id];
}

/** Build the list of selectable items: groups first, then individual stops */
export function getSelectableItems(data: TimetableData): SelectableItem[] {
  const groups: SelectableItem[] = stationGroups.map(g => ({
    id: g.id,
    name: g.name,
    type: 'group',
  }));

  const seen = new Set<string>();
  const stops: SelectableItem[] = [];

  for (const direction of data.directions) {
    for (const stopId of direction.stopIds) {
      if (!seen.has(stopId)) {
        seen.add(stopId);
        const stop = data.stops.find(s => s.id === stopId);
        if (stop) stops.push({ id: stop.id, name: stop.name, type: 'stop' });
      }
    }
  }

  return [...groups, ...stops];
}

export function findNextBuses(
  originIds: string[],
  destinationIds: string[],
  now: number,
  data: TimetableData,
  limit: number = 3
): BusOption[] {
  const results: BusOption[] = [];
  const stopMap = new Map(data.stops.map(s => [s.id, s.name]));
  const originSet = new Set(originIds);
  const destSet = new Set(destinationIds);

  for (const direction of data.directions) {
    const originIndices: number[] = [];
    const destIndices: number[] = [];

    direction.stopIds.forEach((id, i) => {
      if (originSet.has(id)) originIndices.push(i);
      if (destSet.has(id)) destIndices.push(i);
    });

    for (const oi of originIndices) {
      for (const di of destIndices) {
        if (di <= oi) continue;

        const trips = data.trips.filter(t => t.directionId === direction.id);
        for (const trip of trips) {
          const depTime = trip.times[oi];
          const arrTime = trip.times[di];
          if (depTime === null || arrTime === null) continue;
          if (depTime < now) continue;

          const intermediateStops: { name: string; time: number }[] = [];
          for (let k = oi; k <= di; k++) {
            const time = trip.times[k];
            if (time !== null) {
              intermediateStops.push({
                name: stopMap.get(direction.stopIds[k]) || direction.stopIds[k],
                time,
              });
            }
          }

          results.push({
            directionId: direction.id as DirectionId,
            directionLabel: direction.label,
            departureTime: depTime,
            arrivalTime: arrTime,
            travelMinutes: arrTime - depTime,
            intermediateStops,
            originStopName: stopMap.get(direction.stopIds[oi]) || direction.stopIds[oi],
            destinationStopName: stopMap.get(direction.stopIds[di]) || direction.stopIds[di],
          });
        }
      }
    }
  }

  // Sort by arrival time so the fastest option comes first
  results.sort((a, b) => a.arrivalTime - b.arrivalTime);
  return results.slice(0, limit);
}

export function getStopsForSelector(data: TimetableData): { id: string; name: string }[] {
  const seen = new Set<string>();
  const result: { id: string; name: string }[] = [];

  for (const direction of data.directions) {
    for (const stopId of direction.stopIds) {
      if (!seen.has(stopId)) {
        seen.add(stopId);
        const stop = data.stops.find(s => s.id === stopId);
        if (stop) result.push({ id: stop.id, name: stop.name });
      }
    }
  }

  return result;
}

/** Return the set of stop IDs reachable from a given selectable item (stop or group). */
export function getReachableStopIds(
  fromId: string,
  data: TimetableData
): Set<string> {
  const originIds = new Set(resolveStopIds(fromId));
  const reachable = new Set<string>();

  for (const direction of data.directions) {
    // Find the earliest origin index in this direction
    let minOriginIndex = Infinity;
    for (let i = 0; i < direction.stopIds.length; i++) {
      if (originIds.has(direction.stopIds[i])) {
        minOriginIndex = Math.min(minOriginIndex, i);
      }
    }
    if (minOriginIndex === Infinity) continue;

    // All stops after the earliest origin index are reachable in this direction
    for (let i = minOriginIndex + 1; i < direction.stopIds.length; i++) {
      reachable.add(direction.stopIds[i]);
    }
  }

  // Remove any origin IDs from reachable set
  for (const id of originIds) {
    reachable.delete(id);
  }

  return reachable;
}

/** Return the set of stop IDs from which a given selectable item (stop or group) is reachable. */
export function getOriginStopIds(
  toId: string,
  data: TimetableData
): Set<string> {
  const destIds = new Set(resolveStopIds(toId));
  const origins = new Set<string>();

  for (const direction of data.directions) {
    // Find the latest destination index in this direction
    let maxDestIndex = -1;
    for (let i = 0; i < direction.stopIds.length; i++) {
      if (destIds.has(direction.stopIds[i])) {
        maxDestIndex = Math.max(maxDestIndex, i);
      }
    }
    if (maxDestIndex < 0) continue;

    // All stops before the latest destination index can reach it
    for (let i = 0; i < maxDestIndex; i++) {
      origins.add(direction.stopIds[i]);
    }
  }

  // Remove any destination IDs from origins set
  for (const id of destIds) {
    origins.delete(id);
  }

  return origins;
}

export function getAllDepartures(
  stopId: string,
  now: number,
  data: TimetableData,
  limit: number = 5
): { directionLabel: string; time: number; directionId: DirectionId }[] {
  const results: { directionLabel: string; time: number; directionId: DirectionId }[] = [];

  for (const direction of data.directions) {
    const indices = direction.stopIds
      .map((id, i) => (id === stopId ? i : -1))
      .filter(i => i >= 0);

    for (const idx of indices) {
      const trips = data.trips.filter(t => t.directionId === direction.id);
      for (const trip of trips) {
        const time = trip.times[idx];
        if (time !== null && time >= now) {
          results.push({
            directionLabel: direction.label,
            time,
            directionId: direction.id as DirectionId,
          });
        }
      }
    }
  }

  results.sort((a, b) => a.time - b.time);
  return results.slice(0, limit);
}
