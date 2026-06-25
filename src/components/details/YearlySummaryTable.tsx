import { useSimulation } from '../../context/useSimulation'
import { formatYen } from '../../utils/formatCurrency'
import './tables.css'

export function YearlySummaryTable() {
  const { input, result } = useSimulation()

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>年</th>
            <th>ローン返済額</th>
            <th>うち利息</th>
            <th>うち元本</th>
            <th>維持費等</th>
            <th>住宅ローン控除</th>
            <th>年間実質支出</th>
            <th>累計実質支出</th>
            <th>年末残高</th>
          </tr>
        </thead>
        <tbody>
          {result.yearlySummary.map((row) => {
            const maintenance =
              row.mgmtFeeAnnual + row.reserveFeeAnnual + row.parkingFeeAnnual + row.propertyTax + row.fireInsurance + row.otherMaintenance
            return (
              <tr key={row.year} className={row.year === input.holdYears ? 'data-table__row--highlight' : ''}>
                <td>{row.year}年目</td>
                <td>{formatYen(row.loanPayment)}</td>
                <td>{formatYen(row.interestPortion)}</td>
                <td>{formatYen(row.principalPortion)}</td>
                <td>{formatYen(maintenance)}</td>
                <td>-{formatYen(row.loanDeduction)}</td>
                <td>{formatYen(row.annualNetCost)}</td>
                <td>{formatYen(row.cumNetCost)}</td>
                <td>{formatYen(row.yearEndBalance)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="data-table__note">※ハイライト行が「保有年数」（売却予定年）です。</p>
    </div>
  )
}
