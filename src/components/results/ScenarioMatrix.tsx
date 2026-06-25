import { SCENARIO_HOLD_YEARS, SCENARIO_SALE_RATIOS } from '../../domain/constants'
import { useSimulation } from '../../context/useSimulation'
import { Card } from '../common/Card'
import './ScenarioMatrix.css'

function colorForValue(value: number, min: number, max: number): string {
  if (max === min) return 'hsl(50, 80%, 85%)'
  const ratio = (value - min) / (max - min) // 0=cheapest(green) 1=most expensive(red)
  const hue = 130 - ratio * 130 // 130(green) -> 0(red)
  return `hsl(${hue}, 70%, 85%)`
}

export function ScenarioMatrix() {
  const { input, result } = useSimulation()
  const { scenarioMatrix } = result

  const allValues = scenarioMatrix.flatMap((row) => row.map((cell) => cell.monthlyRealRent))
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)

  return (
    <Card title="シナリオ比較（保有年数 × 売却価格率 → 実質月額家賃）">
      <div className="scenario-matrix-wrap">
        <table className="scenario-matrix">
          <thead>
            <tr>
              <th>保有年数＼売却価格率</th>
              {SCENARIO_SALE_RATIOS.map((ratio) => (
                <th key={ratio}>{Math.round(ratio * 100)}%</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCENARIO_HOLD_YEARS.map((holdYears, rowIndex) => (
              <tr key={holdYears}>
                <th>{holdYears}年</th>
                {scenarioMatrix[rowIndex].map((cell) => {
                  const cheaperThanRent = cell.monthlyRealRent < input.currentRent
                  return (
                    <td
                      key={cell.saleRatio}
                      style={{ backgroundColor: colorForValue(cell.monthlyRealRent, min, max) }}
                      className={cheaperThanRent ? 'scenario-matrix__cheaper' : 'scenario-matrix__pricier'}
                      title={cheaperThanRent ? '現在の賃貸より有利' : '現在の賃貸より不利'}
                    >
                      {Math.round(cell.monthlyRealRent).toLocaleString('ja-JP')}円
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="scenario-matrix__note">
          色が緑に近いほど実質月額家賃が安く、赤に近いほど高くなります。太字は現在の家賃（月
          {input.currentRent.toLocaleString('ja-JP')}円）より安く済むケースです。
        </p>
      </div>
    </Card>
  )
}
