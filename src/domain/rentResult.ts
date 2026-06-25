import type { RentResult, SaleSettlement, SimulationInput, YearlyRow } from './types'

/** 最終的な実質家賃結果を計算する（Excel版「実質家賃結果」シートと同じ計算式）。 */
export function computeRentResult(
  yearly: YearlyRow[],
  saleSettlement: SaleSettlement,
  input: SimulationInput,
): RentResult {
  const purchaseCost = input.downPayment + input.purchaseCost
  const holdingPeriodCost = yearly
    .filter((row) => row.year <= input.holdYears)
    .reduce((sum, row) => sum + row.annualNetCost, 0)
  const netProceeds = saleSettlement.netProceeds
  const movingCost = input.movingCost

  const totalRealCost = purchaseCost + holdingPeriodCost - netProceeds + movingCost
  const holdMonths = Math.round(input.holdYears * 12)
  const monthlyRealRent = holdMonths === 0 ? 0 : totalRealCost / holdMonths
  const rentContinuationCost = input.currentRent * holdMonths
  const difference = totalRealCost - rentContinuationCost

  return {
    purchaseCost,
    holdingPeriodCost,
    netProceeds,
    movingCost,
    totalRealCost,
    holdMonths,
    monthlyRealRent,
    rentContinuationCost,
    difference,
  }
}
