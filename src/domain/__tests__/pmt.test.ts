import { describe, expect, it } from 'vitest'
import { pmt } from '../pmt'

describe('pmt', () => {
  it('matches the verified fixture value (loanAmount=45,000,000 / 0.7% / 35y)', () => {
    const monthlyRate = 0.007 / 12
    const result = -pmt(monthlyRate, 35 * 12, 45_000_000)
    expect(result).toBeCloseTo(120834.350423, 3)
  })

  it('handles rate = 0 without division by zero', () => {
    const result = -pmt(0, 12, 1_200_000)
    expect(result).toBeCloseTo(100_000, 6)
  })

  it('matches a known textbook amortization value', () => {
    // 30,000,000円を年利1.2%・30年(360回)で借りた場合の月返済額
    const monthlyRate = 0.012 / 12
    const result = -pmt(monthlyRate, 360, 30_000_000)
    expect(result).toBeCloseTo(99272.61, 1)
  })
})
