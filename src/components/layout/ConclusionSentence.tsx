import { useSimulation } from '../../context/useSimulation'
import { formatYen } from '../../utils/formatCurrency'
import './ConclusionSentence.css'

export function ConclusionSentence() {
  const { input, result } = useSimulation()
  const { rentResult } = result
  const monthlyDiff = Math.abs(rentResult.difference / rentResult.holdMonths)
  const isCheaper = rentResult.difference < 0

  return (
    <p className="conclusion-sentence">
      この条件で購入し{input.holdYears}年後に売却した場合、現在の家賃（月{formatYen(input.currentRent)}）と比べて
      {isCheaper ? (
        <>
          <strong className="conclusion-sentence--good"> 月あたり{formatYen(monthlyDiff)}お得</strong>になります。
        </>
      ) : (
        <>
          <strong className="conclusion-sentence--bad"> 月あたり{formatYen(monthlyDiff)}割高</strong>になります。
        </>
      )}
    </p>
  )
}
