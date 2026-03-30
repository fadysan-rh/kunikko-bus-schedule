import type { BusOption } from '../types';
import { BusOptionCard } from './BusOptionCard';

interface Props {
  results: BusOption[];
  now: number;
  hasSelection: boolean;
  isGroupOrigin?: boolean;
  isGroupDestination?: boolean;
}

export function ResultsPanel({ results, now, hasSelection, isGroupOrigin, isGroupDestination }: Props) {
  if (!hasSelection) {
    return (
      <div className="text-center py-12 text-gray-300">
        <svg className="mx-auto mb-3 w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75M3.375 14.25h.008M21 12l-4.5-4.5M21 12H9m12 0l-4.5 4.5" />
        </svg>
        <p className="text-base font-medium">停留所を選んでください</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-bold text-gray-600">
          本日の運行は終了しました
        </p>
        <p className="text-sm text-gray-400 mt-1">
          または直通便がありません
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
        次のバス ({results.length}件)
      </h2>
      {results.map((opt, i) => (
        <BusOptionCard key={`${opt.directionId}-${opt.departureTime}`} option={opt} now={now} index={i} isGroupOrigin={isGroupOrigin} isGroupDestination={isGroupDestination} />
      ))}
    </div>
  );
}
