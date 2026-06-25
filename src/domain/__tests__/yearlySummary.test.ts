import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../constants'
import { simulateLoanSchedule } from '../loanSchedule'
import { buildYearlySummary } from '../yearlySummary'

describe('buildYearlySummary', () => {
  it('matches the verified fixture for year 1 loan payment and interest', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const yearly = buildYearlySummary(monthly, DEFAULT_INPUT)
    const year1 = yearly.find((row) => row.year === 1)!
    expect(year1.loanPayment).toBeCloseTo(1_450_012.205079, 2)
    expect(year1.interestPortion).toBeCloseTo(311_351.412517, 2)
  })

  it('matches the verified fixture for year 10 year-end balance', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const yearly = buildYearlySummary(monthly, DEFAULT_INPUT)
    const year10 = yearly.find((row) => row.year === 10)!
    expect(year10.yearEndBalance).toBeCloseTo(33_246_738.971982, 2)
  })

  it('applies loan deduction only up to loanYears', () => {
    const input = { ...DEFAULT_INPUT, loanYears: 5, holdYears: 10 }
    const monthly = simulateLoanSchedule(input)
    const yearly = buildYearlySummary(monthly, input)
    expect(yearly.find((row) => row.year === 5)!.loanDeduction).toBe(input.loanDeduction)
    expect(yearly.find((row) => row.year === 6)!.loanDeduction).toBe(0)
  })

  it('generates rows up to holdYears even when loanYears is shorter (loan paid off, holding continues)', () => {
    const input = { ...DEFAULT_INPUT, loanYears: 5, holdYears: 10 }
    const monthly = simulateLoanSchedule(input)
    const yearly = buildYearlySummary(monthly, input)
    expect(yearly).toHaveLength(10)
    const year8 = yearly.find((row) => row.year === 8)!
    expect(year8.loanPayment).toBe(0)
    expect(year8.yearEndBalance).toBe(0)
    // 維持費は完済後も発生する
    expect(year8.annualNetCost).toBeGreaterThan(0)
  })

  it('cumulative net cost accumulates monotonically when there is no deduction larger than cost', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const yearly = buildYearlySummary(monthly, DEFAULT_INPUT)
    for (let i = 1; i < yearly.length; i++) {
      expect(yearly[i].cumNetCost).toBeCloseTo(yearly[i - 1].cumNetCost + yearly[i].annualNetCost, 4)
    }
  })
})
