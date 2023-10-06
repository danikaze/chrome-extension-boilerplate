export function formatAvailableTime(msTime: number): string {
  let remaining = msTime;
  const days = Math.floor(remaining / 86400000);
  remaining -= days * 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining -= hours * 3600000;
  const minutes = Math.floor(remaining / 60000);
  remaining -= minutes * 60000;
  const seconds = Math.floor(remaining / 1000);

  const d = days ? `${days} days ` : '';
  const h = hours ? `${hours}h ` : '';
  const m = minutes ? `${minutes}m ` : '';
  const s = seconds ? `${seconds}s` : '';
  return `${d}${h}${m}${s}`;
}
