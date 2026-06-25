import type { MonthlyRow, SimulationInput, YearlyRow } from './types'

/** 月次ローン返済データを年単位に集計する（Excel版「年次集計」シートと同じ計算式）。 */
export function buildYearlySummary(monthly: MonthlyRow[], input: SimulationInput): YearlyRow[] {
  // 保有年数がローン年数より長い場合に備え、保有年数までの行も生成する（ローン完済後は支払額0として扱われる）
  const totalYears = Math.round(Math.max(input.loanYears, input.holdYears))
  const annualMaintenance =
    (input.mgmtFee + input.reserveFee + input.parkingFee) * 12 +
    input.propertyTax +
    input.fireInsurance +
    input.otherMaintenance

  const rows: YearlyRow[] = []
  let cumNetCost = 0

  for (let year = 1; year <= totalYears; year++) {
    const monthsOfYear = monthly.filter((row) => row.year === year)
    const interestPortion = sum(monthsOfYear.map((row) => row.interest))
    const principalPortion = sum(monthsOfYear.map((row) => row.principal + row.bonusPayment))
    const loanPayment = sum(monthsOfYear.map((row) => row.payment + row.bonusPayment))
    const loanDeduction = year <= input.loanYears ? input.loanDeduction : 0

    const annualNetCost = loanPayment + annualMaintenance - loanDeduction
    cumNetCost += annualNetCost

    const lastMonthOfYear = monthsOfYear[monthsOfYear.length - 1]
    const yearEndBalance = lastMonthOfYear ? lastMonthOfYear.balanceEnd : 0

    rows.push({
      year,
      loanPayment,
      interestPortion,
      principalPortion,
      mgmtFeeAnnual: input.mgmtFee * 12,
      reserveFeeAnnual: input.reserveFee * 12,
      parkingFeeAnnual: input.parkingFee * 12,
      propertyTax: input.propertyTax,
      fireInsurance: input.fireInsurance,
      otherMaintenance: input.otherMaintenance,
      loanDeduction,
      annualNetCost,
      cumNetCost,
      yearEndBalance,
    })
  }

  return rows
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
