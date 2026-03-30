import type { SelectableItem } from '../types';

interface Props {
  items: SelectableItem[];
  originId: string | null;
  destinationId: string | null;
  onOriginChange: (id: string | null) => void;
  onDestinationChange: (id: string | null) => void;
}

export function StopSelector({
  items,
  originId,
  destinationId,
  onOriginChange,
  onDestinationChange,
}: Props) {
  const swap = () => {
    const o = originId;
    const d = destinationId;
    onOriginChange(d);
    onDestinationChange(o);
  };

  const groups = items.filter(i => i.type === 'group');
  const stops = items.filter(i => i.type === 'stop');

  const renderOptions = (prefix: string) => (
    <>
      <option value="">停留所を選択</option>
      {groups.length > 0 && (
        <optgroup label="駅・エリア">
          {groups.map(g => (
            <option key={`${prefix}-${g.id}`} value={g.id}>
              {g.name}
            </option>
          ))}
        </optgroup>
      )}
      <optgroup label="停留所">
        {stops.map(s => (
          <option key={`${prefix}-${s.id}`} value={s.id}>
            {s.name}
          </option>
        ))}
      </optgroup>
    </>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-stretch gap-3">
        {/* Left: route indicator dots */}
        <div className="flex flex-col items-center py-3 shrink-0">
          <div className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
          <div className="flex-1 w-0.5 bg-gray-200 my-1" />
          <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200" />
        </div>

        {/* Center: select inputs */}
        <div className="flex-1 space-y-2 min-w-0">
          <div>
            <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">
              乗車
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              value={originId ?? ''}
              onChange={e => onOriginChange(e.target.value || null)}
            >
              {renderOptions('o')}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-red-500 uppercase tracking-wider mb-0.5">
              降車
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              value={destinationId ?? ''}
              onChange={e => onDestinationChange(e.target.value || null)}
            >
              {renderOptions('d')}
            </select>
          </div>
        </div>

        {/* Right: swap button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={swap}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 active:scale-95 transition-all text-gray-500"
            aria-label="出発と到着を入れ替え"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 7l5-4 5 4M5 13l5 4 5-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
