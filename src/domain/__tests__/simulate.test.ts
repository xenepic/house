import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../constants'
import { runFullSimulation } from '../simulate'

describe('runFullSimulation', () => {
  it('returns a complete, internally-consistent result for the default input', () => {
    const result = runFullSimulation(DEFAULT_INPUT)
    expect(result.monthlySchedule).toHaveLength(DEFAULT_INPUT.loanYears * 12)
    expect(result.yearlySummary.length).toBeGreaterThanOrEqual(DEFAULT_INPUT.holdYears)
    expect(result.rentResult.monthlyRealRent).toBeCloseTo(121_640.508523, 2)
    expect(result.saleSettlement.remainingLoanBalance).toBeCloseTo(33_246_738.971982, 2)
    expect(result.scenarioMatrix).toHaveLength(5)
  })

  it('does not throw for a full-cash purchase (loanAmount = 0)', () => {
    const input = { ...DEFAULT_INPUT, downPayment: DEFAULT_INPUT.price, loanAmount: 0 }
    expect(() => runFullSimulation(input)).not.toThrow()
    const result = runFullSimulation(input)
    expect(result.monthlySchedule.every((row) => row.balanceEnd === 0)).toBe(true)
  })
})
