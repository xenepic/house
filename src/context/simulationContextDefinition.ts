import { createContext } from 'react'
import type { SimulationInput, SimulationResult } from '../domain/types'

export interface SimulationContextValue {
  input: SimulationInput
  setInput: (patch: Partial<SimulationInput>) => void
  resetToDefaults: () => void
  result: SimulationResult
}

export const SimulationContext = createContext<SimulationContextValue | null>(null)
