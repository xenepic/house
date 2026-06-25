import { useSimulation } from '../../context/useSimulation'
import { CollapsibleSection } from '../common/CollapsibleSection'
import { FIELD_SECTIONS } from './fieldConfig'
import { InputField } from './InputField'
import './InputForm.css'

// 最初に確認することが多い「物件・頭金」「ローン条件」のみ初期状態で展開しておく
const DEFAULT_OPEN_SECTIONS = new Set(['物件・頭金', 'ローン条件'])

export function InputForm() {
  const { input, setInput, resetToDefaults } = useSimulation()

  return (
    <div className="input-form">
      <div className="input-form__header">
        <h2>前提条件の入力</h2>
        <button type="button" className="input-form__reset" onClick={resetToDefaults}>
          デフォルトに戻す
        </button>
      </div>
      {FIELD_SECTIONS.map((section) => (
        <CollapsibleSection
          key={section.title}
          title={section.title}
          defaultOpen={DEFAULT_OPEN_SECTIONS.has(section.title)}
        >
          {section.fields.map((field) => (
            <InputField
              key={field.key}
              field={field}
              value={input[field.key]}
              onChange={(value) => setInput({ [field.key]: value })}
            />
          ))}
        </CollapsibleSection>
      ))}
    </div>
  )
}
