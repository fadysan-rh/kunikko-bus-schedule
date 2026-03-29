import type { BusOption } from '../types';
import { BusOptionCard } from './BusOptionCard';

interface Props {
  results: BusOption[];
  now: number;
  hasSelection: boolean;
}

export function ResultsPanel({ results, now, hasSelection }: Props) {
  if (!hasSelection) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-lg">乗車・降車停留所を選択してください</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium text-gray-600">
          本日の運行は終了しました
        </p>
        <p className="text-sm text-gray-400 mt-1">
          または、選択した区間では直通便がありません
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-500">
        次のバス ({results.length}件)
      </h2>
      {results.map((opt, i) => (
        <BusOptionCard key={`${opt.directionId}-${opt.departureTime}`} option={opt} now={now} index={i} />
      ))}
    </div>
  );
}
