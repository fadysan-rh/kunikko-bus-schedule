interface Props {
  stops: { id: string; name: string }[];
  originId: string | null;
  destinationId: string | null;
  onOriginChange: (id: string | null) => void;
  onDestinationChange: (id: string | null) => void;
}

export function StopSelector({
  stops,
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            乗車停留所
          </label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={originId ?? ''}
            onChange={e => onOriginChange(e.target.value || null)}
          >
            <option value="">選択してください</option>
            {stops.map(s => (
              <option key={`o-${s.id}`} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swap}
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-400"
            aria-label="出発と到着を入れ替え"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 7l5-4 5 4M5 13l5 4 5-4" />
            </svg>
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            降車停留所
          </label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={destinationId ?? ''}
            onChange={e => onDestinationChange(e.target.value || null)}
          >
            <option value="">選択してください</option>
            {stops.map(s => (
              <option key={`d-${s.id}`} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
