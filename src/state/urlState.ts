import type { SimulationInput } from '../domain/types'

const NUMERIC_KEYS: Array<keyof SimulationInput> = [
  'price',
  'downPayment',
  'loanAmount',
  'interestRate',
  'loanYears',
  'bonusAmount',
  'purchaseCost',
  'mgmtFee',
  'reserveFee',
  'parkingFee',
  'propertyTax',
  'fireInsurance',
  'otherMaintenance',
  'loanDeduction',
  'holdYears',
  'salePrice',
  'saleFeeRate',
  'saleOtherCost',
  'movingCost',
  'currentRent',
]

/** SimulationInputをURLSearchParamsにエンコードする（純粋関数）。 */
export function encodeInputToSearchParams(input: SimulationInput): URLSearchParams {
  const params = new URLSearchParams()
  for (const key of NUMERIC_KEYS) {
    params.set(key, String(input[key]))
  }
  params.set('bonusFlag', input.bonusFlag ? '1' : '0')
  return params
}

/**
 * URLSearchParamsをSimulationInputの部分オブジェクトにデコードする（純粋関数）。
 * 不正な値（数値に変換できない等）のキーは無視され、結果に含まれない。
 */
export function decodeSearchParamsToInput(params: URLSearchParams): Partial<SimulationInput> {
  const result: Record<string, number | boolean> = {}

  for (const key of NUMERIC_KEYS) {
    const raw = params.get(key)
    if (raw === null) continue
    const value = Number(raw)
    if (Number.isFinite(value)) {
      result[key] = value
    }
  }

  const bonusFlagRaw = params.get('bonusFlag')
  if (bonusFlagRaw === '1' || bonusFlagRaw === '0') {
    result.bonusFlag = bonusFlagRaw === '1'
  }

  return result as Partial<SimulationInput>
}

export function hasAnySimulationParams(params: URLSearchParams): boolean {
  return NUMERIC_KEYS.some((key) => params.has(key)) || params.has('bonusFlag')
}
