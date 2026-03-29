import { useState } from 'react';
import type { BusOption } from '../types';
import { formatTime, formatCountdown } from '../utils/time';

interface Props {
  option: BusOption;
  now: number;
  index: number;
}

export function BusOptionCard({ option, now, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const diff = option.departureTime - now;
  const isImminent = diff <= 5 && diff >= 0;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-4 ${
        index === 0 ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-gray-100'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-gray-900 tabular-nums">
            {formatTime(option.departureTime)}
          </span>
          <span className="text-gray-400">→</span>
          <span className="text-lg font-semibold text-gray-700 tabular-nums">
            {formatTime(option.arrivalTime)}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-sm font-bold px-2.5 py-1 rounded-full ${
              isImminent
                ? 'bg-red-100 text-red-700 animate-pulse'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {formatCountdown(diff)}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
          {option.directionId === 'A' ? '往路' : '復路'}
        </span>
        <span>所要 {option.travelMinutes}分</span>
      </div>

      {option.intermediateStops.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 transition-colors"
        >
          {expanded ? '途中停留所を閉じる' : `途中停留所を表示 (${option.intermediateStops.length - 2}駅)`}
        </button>
      )}

      {expanded && (
        <div className="mt-2 border-t border-gray-100 pt-2">
          <ul className="space-y-1">
            {option.intermediateStops.map((stop, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span
                  className={
                    i === 0 || i === option.intermediateStops.length - 1
                      ? 'font-medium text-gray-900'
                      : 'text-gray-500'
                  }
                >
                  {stop.name}
                </span>
                <span className="tabular-nums text-gray-400">
                  {formatTime(stop.time)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
