import { useState } from 'react';
import { timetable } from '../data/timetable';

export function FareInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold text-amber-800 text-sm">運賃情報</span>
        <span className="text-amber-600 text-xs">{open ? '閉じる' : '表示'}</span>
      </div>
      {open && (
        <div className="px-4 pb-3 text-sm text-amber-700 space-y-1 border-t border-amber-100 pt-2">
          <p>大人: {timetable.fare.adult}円</p>
          <p>小児（小学生まで）: {timetable.fare.child}円</p>
          <p className="text-xs text-amber-500 pt-1">
            未就学児は引率者一人につき2人まで無料
          </p>
        </div>
      )}
    </div>
  );
}
