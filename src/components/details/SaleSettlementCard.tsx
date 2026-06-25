import { useSimulation } from '../../context/useSimulation'
import { formatYen } from '../../utils/formatCurrency'

export function SaleSettlementCard() {
  const { result } = useSimulation()
  const { saleSettlement } = result

  return (
    <dl className="result-grid">
      <div className="result-grid__item">
        <dt>売却価格</dt>
        <dd>{formatYen(saleSettlement.salePrice)}</dd>
      </div>
      <div className="result-grid__item">
        <dt>売却時仲介手数料</dt>
        <dd>-{formatYen(saleSettlement.saleFee)}</dd>
      </div>
      <div className="result-grid__item">
        <dt>売却時その他費用</dt>
        <dd>-{formatYen(saleSettlement.saleOtherCost)}</dd>
      </div>
      <div className="result-grid__item">
        <dt>売却時ローン残債</dt>
        <dd>-{formatYen(saleSettlement.remainingLoanBalance)}</dd>
      </div>
      <div className="result-grid__item">
        <dt>売却後手残り</dt>
        <dd>{formatYen(saleSettlement.netProceeds)}</dd>
      </div>
      <div className="result-grid__item">
        <dt>売却損益の参考値</dt>
        <dd>{formatYen(saleSettlement.profitLossReference)}</dd>
      </div>
    </dl>
  )
}
