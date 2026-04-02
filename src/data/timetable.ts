import type { TimetableData } from '../types';

function t(h: number, m: number): number {
  return h * 60 + m;
}

// Direction A offsets (minutes from first stop departure)
// 国立駅北口(0) → ... → 国立市役所(40)
const DIR_A_OFFSETS = [
  0,  // 国立駅北口
  1,  // 高架下駐輪場前
  2,  // 北二丁目
  3,  // 北福祉館
  4,  // 4号棟東
  5,  // 北市民プラザ
  8,  // 北第一公園西
  10, // 西一丁目西
  11, // 郵政西一丁目Bアパート
  11, // くにたち西児童館
  12, // 国立西郵政宿舎
  12, // ふれあい公園入口
  13, // 北一丁目
  14, // 国立子育て支援施設前
  15, // 国立駅南口
  17, // 国立公民館
  18, // 国立学園
  19, // ぶどう園東
  20, // 学園通り
  21, // 都営西三丁目アパート
  22, // 富士見台防災センター前
  25, // さくら通り西
  27, // 国立郵便局
  29, // くにたち
  30, // 多摩障害者センター
  33, // くにたち中央防災館入口
  38, // 谷保駅西
  40, // 国立市役所
];

// Direction B offsets (minutes from first stop departure)
// 国立市役所(0) → ... → 国立駅北口(40)
const DIR_B_OFFSETS = [
  0,  // 国立市役所
  1,  // 谷保駅西
  2,  // くにたち中央防災館入口
  3,  // 多摩障害者センター
  4,  // くにたち
  5,  // 福祉会館
  7,  // 国立郵便局
  8,  // さくら通り西
  9,  // 都立五商前
  10, // ぶどう園東
  10, // 中町公民センター入口
  11, // 国立学園
  12, // 国立公民館
  13, // 国立子育て支援施設前
  15, // 国立駅南口
  17, // 音高附属前
  18, // 小学校前
  19, // 音大附属前
  21, // 西一丁目交差点
  23, // 小児童遊園東
  27, // 西一丁目西
  32, // 北第一公園西
  32, // 北市民プラザ
  33, // 4号棟東
  33, // 北福祉館
  34, // 北二丁目
  35, // 高架下駐輪場前
  40, // 国立駅北口
];

// Direction A early morning partial trips to 北第一公園西 (index 6 in A stops)
const DIR_A_PARTIAL_DEPARTURES = [
  t(6,53), t(7,8), t(7,23), t(7,38), t(7,53),
  t(8,8), t(8,23), t(8,38), t(9,0), t(9,8),
];
const DIR_A_PARTIAL_END_INDEX = 6; // 北第一公園西 in Direction A

// Direction A full-route departures from 国立駅北口
const DIR_A_DEPARTURES = [
  // Midday (47-min intervals)
  t(9,47), t(10,34), t(11,21), t(12,8), t(12,55),
  t(13,42), t(14,29), t(15,16), t(16,3), t(16,50),
  // Evening
  t(17,40), t(18,10), t(18,25), t(18,55), t(19,10),
  t(19,25), t(19,40), t(20,0), t(20,30),
];

// Direction B full-route departures from 国立市役所
const DIR_B_FULL_DEPARTURES = [
  // Midday (47-min intervals)
  t(9,46), t(10,33), t(11,20), t(12,7), t(12,54),
  t(13,41), t(14,28), t(15,15), t(16,2), t(16,50), t(17,39),
  // Evening (derived from A arrivals + 6 min turnaround)
  t(18,26), t(18,56), t(19,11), t(19,41), t(19,56),
  t(20,11), t(20,26), t(20,46),
];

// Direction B early morning partial trips from 北第一公園西 (index 21 in B stops)
const DIR_B_PARTIAL_DEPARTURES = [
  t(6,45), t(7,0), t(7,15), t(7,30), t(7,45),
  t(8,0), t(8,15), t(8,30), t(8,45), t(9,0),
];
const DIR_B_PARTIAL_START_INDEX = 21; // 北第一公園西 in Direction B

export const timetable: TimetableData = {
  routeName: '北・北西中ルート',
  effectiveDate: '2025-07-01',
  fare: { adult: 210, child: 110 },

  stops: [
    // Direction A stops
    { id: 'a00', name: '国立駅北口' },
    { id: 'a01', name: '高架下駐輪場前' },
    { id: 'a02', name: '北二丁目' },
    { id: 'a03', name: '北福祉館' },
    { id: 'a04', name: '4号棟東' },
    { id: 'a05', name: '北市民プラザ' },
    { id: 'a06', name: '北第一公園西' },
    { id: 'a07', name: '西一丁目西' },
    { id: 'a08', name: '郵政西一丁目Bアパート' },
    { id: 'a09', name: 'くにたち西児童館' },
    { id: 'a10', name: '国立西郵政宿舎' },
    { id: 'a11', name: 'ふれあい公園入口' },
    { id: 'a12', name: '北一丁目' },
    { id: 'a13', name: '国立子育て支援施設前' },
    { id: 'a14', name: '国立駅南口' },
    { id: 'a15', name: '国立公民館' },
    { id: 'a16', name: '国立学園' },
    { id: 'a17', name: 'ぶどう園東' },
    { id: 'a18', name: '学園通り' },
    { id: 'a19', name: '都営西三丁目アパート' },
    { id: 'a20', name: '富士見台防災センター前' },
    { id: 'a21', name: 'さくら通り西' },
    { id: 'a22', name: '国立郵便局' },
    { id: 'a23', name: 'くにたち' },
    { id: 'a24', name: '多摩障害者センター' },
    { id: 'a25', name: 'くにたち中央防災館入口' },
    { id: 'a26', name: '谷保駅西' },
    { id: 'a27', name: '国立市役所' },
    // Direction B unique stops (not in Direction A)
    { id: 'b05', name: '福祉会館' },
    { id: 'b08', name: '都立五商前' },
    { id: 'b10', name: '中町公民センター入口' },
    { id: 'b15', name: '音高附属前' },
    { id: 'b16', name: '小学校前' },
    { id: 'b17', name: '音大附属前' },
    { id: 'b18', name: '西一丁目交差点' },
    { id: 'b19', name: '小児童遊園東' },
  ],

  directions: [
    {
      id: 'A',
      label: '国立駅北口 → 市役所',
      stopIds: [
        'a00', 'a01', 'a02', 'a03', 'a04', 'a05', 'a06',
        'a07', 'a08', 'a09', 'a10', 'a11', 'a12', 'a13',
        'a14', 'a15', 'a16', 'a17', 'a18', 'a19', 'a20',
        'a21', 'a22', 'a23', 'a24', 'a25', 'a26', 'a27',
      ],
    },
    {
      id: 'B',
      label: '市役所 → 国立駅北口',
      stopIds: [
        'a27', // 国立市役所
        'a26', // 谷保駅西
        'a25', // くにたち中央防災館入口
        'a24', // 多摩障害者センター
        'a23', // くにたち
        'b05', // 福祉会館
        'a22', // 国立郵便局
        'a21', // さくら通り西
        'b08', // 都立五商前
        'a17', // ぶどう園東
        'b10', // 中町公民センター入口
        'a16', // 国立学園
        'a15', // 国立公民館
        'a13', // 国立子育て支援施設前
        'a14', // 国立駅南口
        'b15', // 音高附属前
        'b16', // 小学校前
        'b17', // 音大附属前
        'b18', // 西一丁目交差点
        'b19', // 小児童遊園東
        'a07', // 西一丁目西
        'a06', // 北第一公園西
        'a05', // 北市民プラザ
        'a04', // 4号棟東
        'a03', // 北福祉館
        'a02', // 北二丁目
        'a01', // 高架下駐輪場前
        'a00', // 国立駅北口
      ],
    },
  ],

  trips: [
    // Direction A full-route trips
    ...DIR_A_DEPARTURES.map(dep => ({
      directionId: 'A' as const,
      times: DIR_A_OFFSETS.map(offset => dep + offset),
    })),

    // Direction A early morning partial trips (end at 北第一公園西)
    ...DIR_A_PARTIAL_DEPARTURES.map(dep => ({
      directionId: 'A' as const,
      times: DIR_A_OFFSETS.map((offset, i) => {
        if (i > DIR_A_PARTIAL_END_INDEX) return null;
        return dep + offset;
      }),
    })),

    // Direction B full-route trips
    ...DIR_B_FULL_DEPARTURES.map(dep => ({
      directionId: 'B' as const,
      times: DIR_B_OFFSETS.map(offset => dep + offset),
    })),

    // Direction B early morning partial trips (start from 北第一公園西)
    ...DIR_B_PARTIAL_DEPARTURES.map(dep => ({
      directionId: 'B' as const,
      times: DIR_B_OFFSETS.map((offset, i) => {
        if (i < DIR_B_PARTIAL_START_INDEX) return null;
        return dep + (offset - DIR_B_OFFSETS[DIR_B_PARTIAL_START_INDEX]);
      }),
    })),
  ],
};
