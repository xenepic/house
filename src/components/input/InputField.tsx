import type { FieldConfig } from './fieldConfig'
import './InputField.css'

interface Props {
  field: FieldConfig
  value: number | boolean
  onChange: (value: number | boolean) => void
}

export function InputField({ field, value, onChange }: Props) {
  if (field.kind === 'boolean') {
    return (
      <label className="input-field input-field--boolean">
        <span className="input-field__label">{field.label}</span>
        <select
          value={value ? 'あり' : 'なし'}
          onChange={(e) => onChange(e.target.value === 'あり')}
        >
          <option value="なし">なし</option>
          <option value="あり">あり</option>
        </select>
        <span className="input-field__desc">{field.description}</span>
      </label>
    )
  }

  const numericValue = value as number
  const rawDisplayValue = field.kind === 'percent' ? numericValue * 100 : numericValue
  // 0.007*100 のような演算で生じる浮動小数点誤差(0.7000000000000001等)を表示前に丸める
  const displayValue = Math.round(rawDisplayValue * 1e6) / 1e6

  return (
    <label className="input-field">
      <span className="input-field__label">
        {field.label}
        {field.kind === 'percent' && <span className="input-field__unit"> (%)</span>}
        {field.kind === 'years' && <span className="input-field__unit"> (年)</span>}
        {field.kind === 'currency' && <span className="input-field__unit"> (円)</span>}
      </span>
      <input
        type="number"
        value={Number.isFinite(displayValue) ? displayValue : ''}
        step={field.kind === 'percent' ? (field.step ?? 0.1) * 100 : field.step ?? 1}
        onChange={(e) => {
          const raw = e.target.valueAsNumber
          if (Number.isNaN(raw)) return
          onChange(field.kind === 'percent' ? raw / 100 : raw)
        }}
      />
      <span className="input-field__desc">{field.description}</span>
    </label>
  )
}
