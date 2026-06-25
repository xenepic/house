import { simulateLoanSchedule } from './loanSchedule'
import { computeRentResult } from './rentResult'
import { buildScenarioMatrix } from './scenarioMatrix'
import { computeSaleSettlement } from './saleSettlement'
import type { SimulationInput, SimulationResult } from './types'
import { buildYearlySummary } from './yearlySummary'

/** 全ての計算をまとめて実行する唯一のエントリポイント。UIはこの関数の戻り値だけを参照する。 */
export function runFullSimulation(input: SimulationInput): SimulationResult {
  const monthlySchedule = simulateLoanSchedule(input)
  const yearlySummary = buildYearlySummary(monthlySchedule, input)
  const saleSettlement = computeSaleSettlement(monthlySchedule, input)
  const rentResult = computeRentResult(yearlySummary, saleSettlement, input)
  const scenarioMatrix = buildScenarioMatrix(input)

  return { monthlySchedule, yearlySummary, saleSettlement, rentResult, scenarioMatrix }
}
