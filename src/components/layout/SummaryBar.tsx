import { useSimulation } from '../../context/useSimulation'
import { formatSignedYen, formatYen } from '../../utils/formatCurrency'
import './SummaryBar.css'

export function SummaryBar() {
  const { result } = useSimulation()
  const { rentResult } = result
  const isCheaperThanRenting = rentResult.difference < 0

  return (
    <div className="summary-bar">
      <div className="summary-bar__item">
        <span className="summary-bar__label">実質負担額</span>
        <span className="summary-bar__value">{formatYen(rentResult.totalRealCost)}</span>
      </div>
      <div className="summary-bar__item summary-bar__item--primary">
        <span className="summary-bar__label">実質月額家賃</span>
        <span className="summary-bar__value">{formatYen(rentResult.monthlyRealRent)}</span>
      </div>
      <div className="summary-bar__item">
        <span className="summary-bar__label">賃貸との差額</span>
        <span
          className={`summary-bar__value ${isCheaperThanRenting ? 'summary-bar__value--good' : 'summary-bar__value--bad'}`}
        >
          {formatSignedYen(rentResult.difference)}
        </span>
      </div>
    </div>
  )
}
