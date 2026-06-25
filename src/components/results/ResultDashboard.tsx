import { useSimulation } from '../../context/useSimulation'
import { formatYen } from '../../utils/formatCurrency'
import { Card } from '../common/Card'
import { CostComparisonChart } from './CostComparisonChart'
import { ScenarioMatrix } from './ScenarioMatrix'
import './ResultDashboard.css'

export function ResultDashboard() {
  const { result } = useSimulation()
  const { rentResult, saleSettlement } = result

  return (
    <>
      <Card title="主要な内訳">
        <dl className="result-grid">
          <div className="result-grid__item">
            <dt>購入時支出</dt>
            <dd>{formatYen(rentResult.purchaseCost)}</dd>
          </div>
          <div className="result-grid__item">
            <dt>保有期間中の総支出</dt>
            <dd>{formatYen(rentResult.holdingPeriodCost)}</dd>
          </div>
          <div className="result-grid__item">
            <dt>売却後手残り</dt>
            <dd>{formatYen(saleSettlement.netProceeds)}</dd>
          </div>
          <div className="result-grid__item">
            <dt>引越し費用</dt>
            <dd>{formatYen(rentResult.movingCost)}</dd>
          </div>
          <div className="result-grid__item">
            <dt>保有月数</dt>
            <dd>{rentResult.holdMonths}か月</dd>
          </div>
          <div className="result-grid__item">
            <dt>賃貸継続時の総支出</dt>
            <dd>{formatYen(rentResult.rentContinuationCost)}</dd>
          </div>
        </dl>
      </Card>
      <CostComparisonChart />
      <ScenarioMatrix />
    </>
  )
}
