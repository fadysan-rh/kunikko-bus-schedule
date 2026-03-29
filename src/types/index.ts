export interface Stop {
  id: string;
  name: string;
}

export type DirectionId = 'A' | 'B';

export interface Direction {
  id: DirectionId;
  label: string;
  stopIds: string[];
}

export interface Trip {
  directionId: DirectionId;
  times: (number | null)[];
}

export interface TimetableData {
  routeName: string;
  effectiveDate: string;
  stops: Stop[];
  directions: Direction[];
  trips: Trip[];
  fare: {
    adult: number;
    child: number;
  };
}

export interface BusOption {
  directionId: DirectionId;
  directionLabel: string;
  departureTime: number;
  arrivalTime: number;
  travelMinutes: number;
  intermediateStops: { name: string; time: number }[];
}
