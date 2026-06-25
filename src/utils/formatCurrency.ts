const yenFormatter = new Intl.NumberFormat('ja-JP', { maximumFractionDigits: 0 })

export function formatYen(value: number): string {
  return `${yenFormatter.format(Math.round(value))}円`
}

export function formatSignedYen(value: number): string {
  const rounded = Math.round(value)
  const sign = rounded > 0 ? '+' : ''
  return `${sign}${yenFormatter.format(rounded)}円`
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}
