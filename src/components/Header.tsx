import { formatTime } from '../utils/time';

export function Header({ now }: { now: number }) {
  return (
    <header className="bg-emerald-600 text-white px-4 py-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold tracking-tight">
          くにっこ バス時刻表
        </h1>
        <p className="text-emerald-100 text-sm mt-0.5">
          北・北西中ルート ・ 現在 {formatTime(now)}
        </p>
      </div>
    </header>
  );
}
