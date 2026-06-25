import { useState } from 'react'
import { LoanScheduleTable } from './LoanScheduleTable'
import { SaleSettlementCard } from './SaleSettlementCard'
import { YearlySummaryTable } from './YearlySummaryTable'
import './DetailsTabs.css'

const TABS = ['ローン返済表（月次）', '年次集計', '売却精算の内訳'] as const
type Tab = (typeof TABS)[number]

export function DetailsTabs() {
  const [tab, setTab] = useState<Tab>(TABS[0])

  return (
    <div className="details-tabs">
      <div className="details-tabs__nav" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`details-tabs__tab ${tab === t ? 'details-tabs__tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="details-tabs__panel">
        {tab === 'ローン返済表（月次）' && <LoanScheduleTable />}
        {tab === '年次集計' && <YearlySummaryTable />}
        {tab === '売却精算の内訳' && <SaleSettlementCard />}
      </div>
    </div>
  )
}
