import type { SimulationInput } from './types'

export const DEFAULT_INPUT: SimulationInput = {
  price: 50_000_000,
  downPayment: 5_000_000,
  loanAmount: 45_000_000,
  interestRate: 0.007,
  loanYears: 35,
  bonusFlag: false,
  bonusAmount: 100_000,
  purchaseCost: 2_000_000,
  mgmtFee: 15_000,
  reserveFee: 10_000,
  parkingFee: 0,
  propertyTax: 150_000,
  fireInsurance: 20_000,
  otherMaintenance: 30_000,
  loanDeduction: 200_000,
  holdYears: 10,
  salePrice: 45_000_000,
  saleFeeRate: 0.03,
  saleOtherCost: 300_000,
  movingCost: 200_000,
  currentRent: 120_000,
}

export const SCENARIO_HOLD_YEARS = [3, 5, 7, 10, 15] as const
export const SCENARIO_SALE_RATIOS = [0.7, 0.8, 0.9, 1.0, 1.1] as const
