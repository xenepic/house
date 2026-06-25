import type { SimulationInput } from '../domain/types'

const STORAGE_KEY = 'house-rent-sim:input:v1'

/** localStorageから保存済みの入力値を読み込む。失敗時はnullを返す（呼び出し側でデフォルト値にフォールバック）。 */
export function loadInputFromStorage(): Partial<SimulationInput> | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed as Partial<SimulationInput>
  } catch {
    return null
  }
}

/** 入力値をlocalStorageに保存する。失敗（プライベートモード等）しても例外を投げない。 */
export function saveInputToStorage(input: SimulationInput): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
  } catch {
    // localStorageが使えない環境（プライベートブラウジング等）でも処理を継続する
  }
}
