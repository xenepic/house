import { useMemo, type ReactNode } from 'react'
import { runFullSimulation } from '../domain/simulate'
import { useSimulationInput } from '../state/useSimulationInput'
import { SimulationContext } from './simulationContextDefinition'

export function SimulationProvider({ children }: { children: ReactNode }) {
  const { input, setInput, resetToDefaults } = useSimulationInput()
  const result = useMemo(() => runFullSimulation(input), [input])

  return (
    <SimulationContext.Provider value={{ input, setInput, resetToDefaults, result }}>
      {children}
    </SimulationContext.Provider>
  )
}
