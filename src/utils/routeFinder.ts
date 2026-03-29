import type { TimetableData, BusOption, DirectionId } from '../types';

export function findNextBuses(
  originId: string,
  destinationId: string,
  now: number,
  data: TimetableData,
  limit: number = 3
): BusOption[] {
  const results: BusOption[] = [];
  const stopMap = new Map(data.stops.map(s => [s.id, s.name]));

  for (const direction of data.directions) {
    const originIndices: number[] = [];
    const destIndices: number[] = [];

    direction.stopIds.forEach((id, i) => {
      if (id === originId) originIndices.push(i);
      if (id === destinationId) destIndices.push(i);
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
          });
        }
      }
    }
  }

  results.sort((a, b) => a.departureTime - b.departureTime);
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
