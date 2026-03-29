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
      className={`bg-white rounded-2xl shadow-sm border p-4 active:scale-[0.98] transition-transform ${
        index === 0 ? 'border-emerald-300 ring-2 ring-emerald-50' : 'border-gray-100'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top row: times + countdown */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
              {formatTime(option.departureTime)}
            </span>
            <span className="text-gray-300 text-lg">→</span>
            <span className="text-xl font-semibold text-gray-500 tabular-nums">
              {formatTime(option.arrivalTime)}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${
              option.directionId === 'A'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-orange-50 text-orange-600'
            }`}>
              {option.directionId === 'A' ? '往路' : '復路'}
            </span>
            <span className="text-xs text-gray-400">
              {option.travelMinutes}分
            </span>
          </div>
        </div>
        <div
          className={`shrink-0 text-center px-3 py-2 rounded-xl font-bold ${
            isImminent
              ? 'bg-red-500 text-white animate-pulse text-base'
              : diff <= 15
                ? 'bg-emerald-500 text-white text-base'
                : 'bg-gray-100 text-gray-600 text-sm'
          }`}
        >
          {formatCountdown(diff)}
        </div>
      </div>

      {/* Expandable: intermediate stops */}
      {expanded && option.intermediateStops.length > 2 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <ul className="space-y-1.5">
            {option.intermediateStops.map((stop, i) => {
              const isTerminal = i === 0 || i === option.intermediateStops.length - 1;
              return (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      isTerminal ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-sm truncate ${
                      isTerminal ? 'font-bold text-gray-900' : 'text-gray-500'
                    }`}>
                      {stop.name}
                    </span>
                  </div>
                  <span className="tabular-nums text-sm text-gray-400 shrink-0 ml-2">
                    {formatTime(stop.time)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Hint to expand */}
      {!expanded && option.intermediateStops.length > 2 && (
        <p className="mt-2 text-[11px] text-gray-300 text-center">
          タップで{option.intermediateStops.length - 2}つの途中停留所を表示
        </p>
      )}
    </div>
  );
}
