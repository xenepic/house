import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../constants'
import { simulateLoanSchedule } from '../loanSchedule'
import { computeSaleSettlement } from '../saleSettlement'

describe('computeSaleSettlement', () => {
  it('matches the verified fixture values for the default input (hold 10 years)', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const result = computeSaleSettlement(monthly, DEFAULT_INPUT)
    expect(result.saleFee).toBeCloseTo(1_350_000, 2)
    expect(result.remainingLoanBalance).toBeCloseTo(33_246_738.971982, 2)
    expect(result.netProceeds).toBeCloseTo(10_103_261.028018, 2)
    expect(result.profitLossReference).toBe(DEFAULT_INPUT.salePrice - DEFAULT_INPUT.price)
  })
})
