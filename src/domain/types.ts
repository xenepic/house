export interface SimulationInput {
  price: number
  downPayment: number
  loanAmount: number
  interestRate: number
  loanYears: number
  bonusFlag: boolean
  bonusAmount: number
  purchaseCost: number
  mgmtFee: number
  reserveFee: number
  parkingFee: number
  propertyTax: number
  fireInsurance: number
  otherMaintenance: number
  loanDeduction: number
  holdYears: number
  salePrice: number
  saleFeeRate: number
  saleOtherCost: number
  movingCost: number
  currentRent: number
}

export interface MonthlyRow {
  month: number
  year: number
  balanceStart: number
  payment: number
  interest: number
  principal: number
  bonusPayment: number
  balanceEnd: number
  cumPayment: number
  cumInterest: number
  cumPrincipal: number
}

export interface YearlyRow {
  year: number
  loanPayment: number
  interestPortion: number
  principalPortion: number
  mgmtFeeAnnual: number
  reserveFeeAnnual: number
  parkingFeeAnnual: number
  propertyTax: number
  fireInsurance: number
  otherMaintenance: number
  loanDeduction: number
  annualNetCost: number
  cumNetCost: number
  yearEndBalance: number
}

export interface SaleSettlement {
  salePrice: number
  saleFee: number
  saleOtherCost: number
  remainingLoanBalance: number
  netProceeds: number
  profitLossReference: number
}

export interface RentResult {
  purchaseCost: number
  holdingPeriodCost: number
  netProceeds: number
  movingCost: number
  totalRealCost: number
  holdMonths: number
  monthlyRealRent: number
  rentContinuationCost: number
  difference: number
}

export interface ScenarioCell {
  holdYears: number
  saleRatio: number
  monthlyRealRent: number
}

export interface SimulationResult {
  monthlySchedule: MonthlyRow[]
  yearlySummary: YearlyRow[]
  saleSettlement: SaleSettlement
  rentResult: RentResult
  scenarioMatrix: ScenarioCell[][]
}
