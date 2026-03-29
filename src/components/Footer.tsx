import { timetable } from '../data/timetable';

export function Footer() {
  return (
    <footer className="text-center text-xs text-gray-400 py-6 space-y-1">
      <p>データ: {timetable.effectiveDate} 現在</p>
      <p>平日も土休日もダイヤは同じです</p>
      <p>渋滞などで遅れることがあります</p>
      <p className="pt-2">作成: 国立市道路交通課</p>
    </footer>
  );
}
