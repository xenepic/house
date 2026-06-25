import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../constants'
import { simulateLoanSchedule } from '../loanSchedule'
import { computeRentResult } from '../rentResult'
import { computeSaleSettlement } from '../saleSettlement'
import { buildYearlySummary } from '../yearlySummary'

describe('computeRentResult', () => {
  it('matches the verified fixture values for the default input', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const yearly = buildYearlySummary(monthly, DEFAULT_INPUT)
    const saleSettlement = computeSaleSettlement(monthly, DEFAULT_INPUT)
    const result = computeRentResult(yearly, saleSettlement, DEFAULT_INPUT)

    expect(result.purchaseCost).toBe(7_000_000)
    expect(result.holdingPeriodCost).toBeCloseTo(17_500_122.050786, 2)
    expect(result.totalRealCost).toBeCloseTo(14_596_861.022767, 2)
    expect(result.holdMonths).toBe(120)
    expect(result.monthlyRealRent).toBeCloseTo(121_640.508523, 2)
    expect(result.rentContinuationCost).toBe(14_400_000)
    expect(result.difference).toBeCloseTo(196_861.022767, 2)
  })

  it('difference is negative when buying is cheaper than continuing to rent', () => {
    const input = { ...DEFAULT_INPUT, currentRent: 300_000 }
    const monthly = simulateLoanSchedule(input)
    const yearly = buildYearlySummary(monthly, input)
    const saleSettlement = computeSaleSettlement(monthly, input)
    const result = computeRentResult(yearly, saleSettlement, input)
    expect(result.difference).toBeLessThan(0)
  })
})
