import { timetable } from '../data/timetable';

export function FareInfo() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
      <h3 className="font-bold text-amber-800 mb-1">運賃（一回乗車）</h3>
      <ul className="space-y-0.5 text-amber-700">
        <li>大人: {timetable.fare.adult}円</li>
        <li>小児（小学生まで）: {timetable.fare.child}円</li>
      </ul>
      <p className="mt-2 text-xs text-amber-600">
        未就学児は引率者一人につき2人まで無料
      </p>
    </div>
  );
}
