import type { SimulationInput } from '../../domain/types'

export type FieldKind = 'currency' | 'percent' | 'years' | 'boolean'

export interface FieldConfig {
  key: keyof SimulationInput
  label: string
  kind: FieldKind
  description: string
  step?: number
}

export interface FieldSection {
  title: string
  fields: FieldConfig[]
}

export const FIELD_SECTIONS: FieldSection[] = [
  {
    title: '物件・頭金',
    fields: [
      { key: 'price', label: '物件価格', kind: 'currency', description: '購入する住宅の価格' },
      { key: 'downPayment', label: '頭金', kind: 'currency', description: '購入時に現金で支払う頭金' },
      {
        key: 'loanAmount',
        label: '借入額',
        kind: 'currency',
        description: '通常は「物件価格-頭金」。直接上書きも可',
      },
    ],
  },
  {
    title: 'ローン条件',
    fields: [
      { key: 'interestRate', label: 'ローン金利（年率）', kind: 'percent', step: 0.001, description: '住宅ローンの年利' },
      { key: 'loanYears', label: '返済期間', kind: 'years', description: 'ローンの返済期間' },
      { key: 'bonusFlag', label: 'ボーナス返済', kind: 'boolean', description: 'ボーナス返済の有無' },
      {
        key: 'bonusAmount',
        label: 'ボーナス返済額（1回あたり）',
        kind: 'currency',
        description: '6か月ごとに上乗せする金額（ボーナス返済ありの場合）',
      },
    ],
  },
  {
    title: '維持費・諸費用',
    fields: [
      { key: 'purchaseCost', label: '購入時諸費用', kind: 'currency', description: '仲介手数料・登記費用等の合計' },
      { key: 'mgmtFee', label: '管理費（月額）', kind: 'currency', description: 'マンション管理費等' },
      { key: 'reserveFee', label: '修繕積立金（月額）', kind: 'currency', description: '修繕積立金' },
      { key: 'parkingFee', label: '駐車場代（月額）', kind: 'currency', description: '駐車場の月額（無ければ0）' },
      { key: 'propertyTax', label: '固定資産税（年額）', kind: 'currency', description: '固定資産税・都市計画税の年額目安' },
      { key: 'fireInsurance', label: '火災保険料（年額）', kind: 'currency', description: '火災・地震保険の年額' },
      { key: 'otherMaintenance', label: 'その他維持費（年額）', kind: 'currency', description: 'リフォーム等の積立目安' },
      { key: 'loanDeduction', label: '住宅ローン控除額（年額）', kind: 'currency', description: '簡易計算：控除対象の年に一律で適用' },
    ],
  },
  {
    title: '保有・売却',
    fields: [
      { key: 'holdYears', label: '保有年数', kind: 'years', description: '購入後、売却までの保有年数' },
      { key: 'salePrice', label: '売却予定価格', kind: 'currency', description: '保有後に売却できると想定する価格' },
      { key: 'saleFeeRate', label: '売却時仲介手数料率', kind: 'percent', step: 0.001, description: '売却時に支払う仲介手数料の率' },
      { key: 'saleOtherCost', label: '売却時その他費用', kind: 'currency', description: '抵当権抹消費用等' },
      { key: 'movingCost', label: '引越し費用', kind: 'currency', description: '売却・転居に伴う引越し費用' },
    ],
  },
  {
    title: '賃貸比較',
    fields: [
      { key: 'currentRent', label: '現在家賃（月額）', kind: 'currency', description: '購入せず賃貸を続けた場合の月額家賃' },
    ],
  },
]
