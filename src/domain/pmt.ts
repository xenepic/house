/**
 * Excelの PMT(rate, nper, pv, fv, type) と完全互換の実装。
 * pvに正の値（借入額）を渡すと、Excelと同じく負の値（キャッシュアウト）を返す。
 * 呼び出し側でExcelの数式同様に `-pmt(...)` として使うことを想定。
 */
export function pmt(rate: number, nper: number, pv: number, fv = 0, type: 0 | 1 = 0): number {
  if (nper === 0) return 0
  if (rate === 0) return -(pv + fv) / nper
  const factor = Math.pow(1 + rate, nper)
  return ((-(pv * factor + fv) * rate) / (factor - 1)) / (1 + type * rate)
}
