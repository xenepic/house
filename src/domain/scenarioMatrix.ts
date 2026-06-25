import { SCENARIO_HOLD_YEARS, SCENARIO_SALE_RATIOS } from './constants'
import { simulateLoanSchedule } from './loanSchedule'
import { computeRentResult } from './rentResult'
import { computeSaleSettlement } from './saleSettlement'
import type { ScenarioCell, SimulationInput } from './types'
import { buildYearlySummary } from './yearlySummary'

/**
 * 保有年数×売却価格率のシナリオ比較マトリクスを計算する。
 *
 * Excel版はパフォーマンス上の理由からボーナス返済を無視したclosed-form式を使っていたが、
 * Web版では月次シミュレーション（ボーナス返済込み）を1回だけ実行し、
 * 各シナリオ（保有年数・売却価格）ごとに年次集計・売却精算・実質家賃結果の計算を再利用することで、
 * ボーナス返済を含めた正確な値を計算する。ローン自体の挙動は保有年数や売却価格に依存しないため、
 * 月次シミュレーションは1回の実行で全シナリオに使い回せる。
 */
export function buildScenarioMatrix(input: SimulationInput): ScenarioCell[][] {
  const maxScenarioHoldYears = Math.max(...SCENARIO_HOLD_YEARS)
  const monthly = simulateLoanSchedule(input)
  // シナリオの中で最も長い保有年数までの年次データを必ず確保する（input.holdYearsがそれより短い場合に備える）
  const yearly = buildYearlySummary(monthly, { ...input, holdYears: maxScenarioHoldYears })

  return SCENARIO_HOLD_YEARS.map((holdYears) =>
    SCENARIO_SALE_RATIOS.map((saleRatio) => {
      const scenarioInput: SimulationInput = {
        ...input,
        holdYears,
        salePrice: input.price * saleRatio,
      }
      const saleSettlement = computeSaleSettlement(monthly, scenarioInput)
      const rentResult = computeRentResult(yearly, saleSettlement, scenarioInput)
      return { holdYears, saleRatio, monthlyRealRent: rentResult.monthlyRealRent }
    }),
  )
}
