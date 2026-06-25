import { getBalanceAtMonth } from './loanSchedule'
import type { MonthlyRow, SaleSettlement, SimulationInput } from './types'

/** 売却時点の精算を計算する（Excel版「売却精算」シートと同じ計算式）。 */
export function computeSaleSettlement(monthly: MonthlyRow[], input: SimulationInput): SaleSettlement {
  const saleFee = input.salePrice * input.saleFeeRate
  const remainingLoanBalance = getBalanceAtMonth(monthly, Math.round(input.holdYears * 12))
  const netProceeds = input.salePrice - saleFee - input.saleOtherCost - remainingLoanBalance
  const profitLossReference = input.salePrice - input.price

  return {
    salePrice: input.salePrice,
    saleFee,
    saleOtherCost: input.saleOtherCost,
    remainingLoanBalance,
    netProceeds,
    profitLossReference,
  }
}
