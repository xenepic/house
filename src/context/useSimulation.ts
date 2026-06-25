import { useContext } from 'react'
import { SimulationContext, type SimulationContextValue } from './simulationContextDefinition'

export function useSimulation(): SimulationContextValue {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulation must be used within a SimulationProvider')
  return ctx
}
