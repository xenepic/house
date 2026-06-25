import { useState } from 'react'
import { useSimulation } from '../../context/useSimulation'
import { formatYen } from '../../utils/formatCurrency'
import './tables.css'

export function LoanScheduleTable() {
  const { result } = useSimulation()
  const years = Array.from(new Set(result.monthlySchedule.map((row) => row.year)))
  const [selectedYear, setSelectedYear] = useState(years[0] ?? 1)

  const rows = result.monthlySchedule.filter((row) => row.year === selectedYear)

  return (
    <div className="data-table-wrap">
      <label className="data-table__year-select">
        表示する年:{' '}
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}年目
            </option>
          ))}
        </select>
      </label>
      <table className="data-table">
        <thead>
          <tr>
            <th>月数</th>
            <th>期首残高</th>
            <th>月返済額</th>
            <th>利息</th>
            <th>元本返済額</th>
            <th>ボーナス返済額</th>
            <th>期末残高</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month}>
              <td>{row.month}か月目</td>
              <td>{formatYen(row.balanceStart)}</td>
              <td>{formatYen(row.payment)}</td>
              <td>{formatYen(row.interest)}</td>
              <td>{formatYen(row.principal)}</td>
              <td>{row.bonusPayment > 0 ? formatYen(row.bonusPayment) : '-'}</td>
              <td>{formatYen(row.balanceEnd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
