export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}

export function formatCountdown(diffMinutes: number): string {
  if (diffMinutes <= 0) return 'まもなく';
  if (diffMinutes < 60) return `あと${diffMinutes}分`;
  const h = Math.floor(diffMinutes / 60);
  const m = diffMinutes % 60;
  if (m === 0) return `あと${h}時間`;
  return `あと${h}時間${m}分`;
}
