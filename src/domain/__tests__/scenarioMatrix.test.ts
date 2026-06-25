import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT, SCENARIO_HOLD_YEARS, SCENARIO_SALE_RATIOS } from '../constants'
import { runFullSimulation } from '../simulate'
import { buildScenarioMatrix } from '../scenarioMatrix'

describe('buildScenarioMatrix', () => {
  it('produces a 5x5 matrix covering all hold-year / sale-ratio combinations', () => {
    const matrix = buildScenarioMatrix(DEFAULT_INPUT)
    expect(matrix).toHaveLength(SCENARIO_HOLD_YEARS.length)
    matrix.forEach((row) => expect(row).toHaveLength(SCENARIO_SALE_RATIOS.length))
  })

  it('cross-checks against rentResult: holdYears=10, saleRatio=90% must match the default scenario', () => {
    // DEFAULT_INPUT.salePrice (45,000,000) is exactly 90% of price (50,000,000),
    // and DEFAULT_INPUT.holdYears is 10 — so this scenario cell must equal rentResult.monthlyRealRent exactly.
    const result = runFullSimulation(DEFAULT_INPUT)
    const row = result.scenarioMatrix.find((r) => r[0].holdYears === 10)!
    const cell = row.find((c) => c.saleRatio === 0.9)!
    expect(cell.monthlyRealRent).toBeCloseTo(result.rentResult.monthlyRealRent, 6)
    expect(cell.monthlyRealRent).toBeCloseTo(121_640.508523, 2)
  })

  it('shorter holding period yields a cheaper monthly real rent when sale ratio is high (110%)', () => {
    // この挙動はExcel版のシナリオ比較シートでも確認済み:
    // 同じ売却価格率なら、保有コストが積み上がる前に売却益を確定する方が月額換算では有利になる。
    const matrix = buildScenarioMatrix(DEFAULT_INPUT)
    const col = SCENARIO_SALE_RATIOS.indexOf(1.1)
    const values = matrix.map((row) => row[col].monthlyRealRent)
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })

  it('correctly accounts for bonus payments unlike the Excel closed-form approximation', () => {
    const withBonus = { ...DEFAULT_INPUT, bonusFlag: true, bonusAmount: 300_000 }
    const matrixNoBonus = buildScenarioMatrix(DEFAULT_INPUT)
    const matrixWithBonus = buildScenarioMatrix(withBonus)
    // ボーナス返済があると残高がより早く減るため、同条件で実質月額家賃は変化するはず
    expect(matrixWithBonus[2][3].monthlyRealRent).not.toBeCloseTo(matrixNoBonus[2][3].monthlyRealRent, 2)
  })

  it('handles holdYears longer than loanYears without throwing or producing NaN', () => {
    const input = { ...DEFAULT_INPUT, loanYears: 5 }
    const matrix = buildScenarioMatrix(input)
    matrix.forEach((row) =>
      row.forEach((cell) => {
        expect(Number.isFinite(cell.monthlyRealRent)).toBe(true)
      }),
    )
  })
})
