import { formatTime } from '../utils/time';

export function Header({ now }: { now: number }) {
  return (
    <header className="sticky top-0 z-10 bg-emerald-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            くにっこ バス時刻表
          </h1>
          <p className="text-emerald-200 text-xs">
            北・北西中ルート
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tabular-nums">{formatTime(now)}</p>
          <p className="text-emerald-200 text-[10px]">現在時刻</p>
        </div>
      </div>
    </header>
  );
}
