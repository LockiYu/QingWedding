const DAY = 86_400_000
export const zone = 'Asia/Shanghai'

function parseDate(value: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const year = Number(match[1]), month = Number(match[2]), day = Number(match[3])
  const d = new Date(Date.UTC(year, month - 1, day))
  return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day ? { year, month, day } : null
}
function ordinal(d: { year: number; month: number; day: number }) { return Date.UTC(d.year, d.month - 1, d.day) / DAY }
export function shanghaiToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const get = (key: string) => Number(parts.find(p => p.type === key)?.value)
  return { year: get('year'), month: get('month'), day: get('day') }
}
function anniversary(year: number, month: number, day: number) {
  // 2 月 29 日在非闰年按 2 月 28 日纪念。
  const actualDay = month === 2 && day === 29 && new Date(Date.UTC(year, 1, 29)).getUTCMonth() !== 1 ? 28 : day
  return { year, month, day: actualDay }
}
export function weddingCount(date: string, now = new Date()) {
  const start = parseDate(date)
  if (!start) return null
  const today = shanghaiToday(now)
  const elapsed = ordinal(today) - ordinal(start)
  if (elapsed < 0) return { kind: 'before' as const, days: -elapsed, nextDate: date, remaining: -elapsed }
  let next = anniversary(today.year, start.month, start.day)
  if (ordinal(next) <= ordinal(today)) next = anniversary(today.year + 1, start.month, start.day)
  return { kind: 'after' as const, days: elapsed, nextDate: `${next.year}-${String(next.month).padStart(2, '0')}-${String(next.day).padStart(2, '0')}`, remaining: ordinal(next) - ordinal(today) }
}
