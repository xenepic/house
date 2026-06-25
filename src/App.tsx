import { ConclusionSentence } from './components/layout/ConclusionSentence'
import { Header } from './components/layout/Header'
import { SummaryBar } from './components/layout/SummaryBar'
import { InputForm } from './components/input/InputForm'
import { ResultDashboard } from './components/results/ResultDashboard'
import { DetailsTabs } from './components/details/DetailsTabs'
import { CollapsibleSection } from './components/common/CollapsibleSection'
import { SimulationProvider } from './context/SimulationContext'
import './App.css'

function App() {
  return (
    <SimulationProvider>
      <header>
        <Header />
        <SummaryBar />
      </header>
      <main className="app-main">
        <ConclusionSentence />
        <div className="app-main__columns">
          <section className="app-main__form">
            <InputForm />
          </section>
          <section className="app-main__results">
            <ResultDashboard />
          </section>
        </div>
        <CollapsibleSection title="詳細データを見る（ローン返済表・年次集計・売却精算）">
          <DetailsTabs />
        </CollapsibleSection>
      </main>
      <footer className="app-footer">
        このツールは簡易的なシミュレーションです。税務・法務上の正式な助言ではありません。実際の購入・売却の判断は専門家にご相談ください。
      </footer>
    </SimulationProvider>
  )
}

export default App
