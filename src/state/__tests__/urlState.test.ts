import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUT } from '../../domain/constants'
import { decodeSearchParamsToInput, encodeInputToSearchParams, hasAnySimulationParams } from '../urlState'

describe('urlState', () => {
  it('round-trips encode -> decode and restores the original input', () => {
    const params = encodeInputToSearchParams(DEFAULT_INPUT)
    const decoded = decodeSearchParamsToInput(params)
    expect(decoded).toEqual(DEFAULT_INPUT)
  })

  it('ignores invalid (non-numeric) values and falls back to defaults for those keys', () => {
    const params = new URLSearchParams('price=not-a-number&downPayment=5000000')
    const decoded = decodeSearchParamsToInput(params)
    expect(decoded.price).toBeUndefined()
    expect(decoded.downPayment).toBe(5000000)
  })

  it('decodes bonusFlag from "1"/"0" strings', () => {
    expect(decodeSearchParamsToInput(new URLSearchParams('bonusFlag=1')).bonusFlag).toBe(true)
    expect(decodeSearchParamsToInput(new URLSearchParams('bonusFlag=0')).bonusFlag).toBe(false)
    expect(decodeSearchParamsToInput(new URLSearchParams('')).bonusFlag).toBeUndefined()
  })

  it('hasAnySimulationParams detects presence of relevant query params', () => {
    expect(hasAnySimulationParams(new URLSearchParams(''))).toBe(false)
    expect(hasAnySimulationParams(new URLSearchParams('price=100'))).toBe(true)
    expect(hasAnySimulationParams(new URLSearchParams('utm_source=foo'))).toBe(false)
  })
})
