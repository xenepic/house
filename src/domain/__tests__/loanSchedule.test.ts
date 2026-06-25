import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../constants'
import { getBalanceAtMonth, simulateLoanSchedule } from '../loanSchedule'

describe('simulateLoanSchedule', () => {
  it('matches the verified fixture balances at year 1 and year 10 (no bonus)', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    expect(getBalanceAtMonth(monthly, 12)).toBeCloseTo(43_861_339.207438, 2)
    expect(getBalanceAtMonth(monthly, 120)).toBeCloseTo(33_246_738.971982, 2)
  })

  it('matches the verified fixture for year 1 payment and interest', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const year1 = monthly.filter((row) => row.year === 1)
    const totalPayment = year1.reduce((sum, row) => sum + row.payment + row.bonusPayment, 0)
    const totalInterest = year1.reduce((sum, row) => sum + row.interest, 0)
    expect(totalPayment).toBeCloseTo(1_450_012.205079, 2)
    expect(totalInterest).toBeCloseTo(311_351.412517, 2)
  })

  it('balance is monotonically non-increasing', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    for (let i = 1; i < monthly.length; i++) {
      expect(monthly[i].balanceStart).toBeLessThanOrEqual(monthly[i - 1].balanceStart + 1e-6)
    }
  })

  it('ends with a near-zero balance after the full loan term', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    const last = monthly[monthly.length - 1]
    expect(last.balanceEnd).toBeCloseTo(0, 2)
  })

  it('applies bonus payments only every 6th month, capped at the remaining balance', () => {
    const input = { ...DEFAULT_INPUT, bonusFlag: true, bonusAmount: 500_000 }
    const monthly = simulateLoanSchedule(input)
    for (const row of monthly) {
      if (row.month % 6 !== 0) {
        expect(row.bonusPayment).toBe(0)
      }
    }
    // 残高を超えるボーナス額を指定しても残高はマイナスにならない
    for (const row of monthly) {
      expect(row.balanceEnd).toBeGreaterThanOrEqual(0)
    }
  })

  it('handles a tiny loan that bonus payments pay off early without going negative', () => {
    const input = {
      ...DEFAULT_INPUT,
      loanAmount: 1_000_000,
      interestRate: 0.01,
      loanYears: 5,
      bonusFlag: true,
      bonusAmount: 900_000,
    }
    const monthly = simulateLoanSchedule(input)
    expect(monthly.every((row) => row.balanceEnd >= 0)).toBe(true)
    // 6か月目に大きなボーナス返済が入り、わずかな残額は7か月目で完済されるはず
    const after = monthly.filter((row) => row.month > 7)
    expect(after.every((row) => row.balanceStart === 0)).toBe(true)
  })

  it('handles a 0% interest rate without division by zero', () => {
    const input = { ...DEFAULT_INPUT, interestRate: 0 }
    const monthly = simulateLoanSchedule(input)
    expect(monthly.every((row) => Number.isFinite(row.payment))).toBe(true)
    expect(monthly[monthly.length - 1].balanceEnd).toBeCloseTo(0, 2)
  })

  it('returns balance 0 for months beyond the array (held longer than loan term)', () => {
    const monthly = simulateLoanSchedule(DEFAULT_INPUT)
    expect(getBalanceAtMonth(monthly, monthly.length + 12)).toBe(0)
  })
})
