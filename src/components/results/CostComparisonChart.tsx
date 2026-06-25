import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip as ChartTooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useSimulation } from '../../context/useSimulation'
import { Card } from '../common/Card'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend)

export function CostComparisonChart() {
  const { input, result } = useSimulation()
  const { rentResult, yearlySummary } = result

  const years = Array.from({ length: input.holdYears + 1 }, (_, i) => i)
  const purchaseCumulative = years.map((year) => {
    if (year === 0) return rentResult.purchaseCost
    const row = yearlySummary.find((r) => r.year === year)
    return rentResult.purchaseCost + (row ? row.cumNetCost : 0)
  })
  const rentCumulative = years.map((year) => input.currentRent * 12 * year)

  const data = {
    labels: years.map((y) => `${y}年目`),
    datasets: [
      {
        label: '購入（累積コスト）',
        data: purchaseCumulative,
        borderColor: '#7c3aed',
        backgroundColor: '#7c3aed',
        tension: 0.1,
      },
      {
        label: '賃貸継続（累積コスト）',
        data: rentCumulative,
        borderColor: '#9ca3af',
        backgroundColor: '#9ca3af',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            `${ctx.dataset.label}: ${Math.round(ctx.parsed.y ?? 0).toLocaleString('ja-JP')}円`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => `${Number(value).toLocaleString('ja-JP')}円`,
        },
      },
    },
  }

  return (
    <Card title="累積コスト比較（購入 vs 賃貸継続）">
      <div style={{ height: 280 }}>
        <Line
          data={data}
          options={options}
          aria-label={`購入と賃貸継続の累積コストを比較する折れ線グラフ。${input.holdYears}年目時点で購入は${Math.round(
            purchaseCumulative[purchaseCumulative.length - 1],
          ).toLocaleString('ja-JP')}円、賃貸継続は${Math.round(rentCumulative[rentCumulative.length - 1]).toLocaleString('ja-JP')}円。`}
          role="img"
        />
      </div>
    </Card>
  )
}
