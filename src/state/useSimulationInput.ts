import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_INPUT } from '../domain/constants'
import type { SimulationInput } from '../domain/types'
import { loadInputFromStorage, saveInputToStorage } from './localStorageState'
import { decodeSearchParamsToInput, encodeInputToSearchParams, hasAnySimulationParams } from './urlState'

const SYNC_DEBOUNCE_MS = 300

function resolveInitialInput(): SimulationInput {
  if (typeof window === 'undefined') return DEFAULT_INPUT

  const params = new URLSearchParams(window.location.search)
  if (hasAnySimulationParams(params)) {
    return { ...DEFAULT_INPUT, ...decodeSearchParamsToInput(params) }
  }

  const stored = loadInputFromStorage()
  if (stored) {
    return { ...DEFAULT_INPUT, ...stored }
  }

  return DEFAULT_INPUT
}

export interface UseSimulationInputResult {
  input: SimulationInput
  setInput: (patch: Partial<SimulationInput>) => void
  resetToDefaults: () => void
}

/**
 * 入力state管理フック。
 * 初期値の優先順位: URLクエリパラメータ > localStorage保存値 > デフォルト値。
 * 入力変更は300msデバウンスでlocalStorageとURL（history.replaceState、履歴は汚さない）に反映する。
 */
export function useSimulationInput(): UseSimulationInputResult {
  const [input, setInputState] = useState<SimulationInput>(resolveInitialInput)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      saveInputToStorage(input)
      const params = encodeInputToSearchParams(input)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState(null, '', newUrl)
    }, SYNC_DEBOUNCE_MS)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [input])

  const setInput = useCallback((patch: Partial<SimulationInput>) => {
    setInputState((prev) => {
      const next = { ...prev, ...patch }
      // 借入額は原則「物件価格-頭金」で自動計算する（Excel版の数式と同じ挙動）。
      // ただし、借入額そのものを直接編集した場合はその値を優先し、自動計算で上書きしない。
      const priceOrDownPaymentChanged = 'price' in patch || 'downPayment' in patch
      const loanAmountExplicitlySet = 'loanAmount' in patch
      if (priceOrDownPaymentChanged && !loanAmountExplicitlySet) {
        next.loanAmount = next.price - next.downPayment
      }
      return next
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setInputState(DEFAULT_INPUT)
  }, [])

  return { input, setInput, resetToDefaults }
}
