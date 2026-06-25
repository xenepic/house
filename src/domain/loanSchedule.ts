import { pmt } from './pmt'
import type { MonthlyRow, SimulationInput } from './types'

/**
 * 月次ローン返済シミュレーション。
 * Excel版「ローン返済表」シートと同じ計算式（PMT方式の元利均等返済＋任意のボーナス返済）を再現する。
 * 返済が完了（残高0）した後の月はゼロ埋め行で配列を埋める。
 */
export function simulateLoanSchedule(input: SimulationInput): MonthlyRow[] {
  const totalMonths = Math.round(input.loanYears * 12)
  const monthlyRate = input.interestRate / 12
  const basePayment = -pmt(monthlyRate, totalMonths, input.loanAmount)

  const rows: MonthlyRow[] = []
  let balanceStart = input.loanAmount
  let cumPayment = 0
  let cumInterest = 0
  let cumPrincipal = 0

  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.floor((month - 1) / 12) + 1

    if (balanceStart <= 0) {
      rows.push({
        month,
        year,
        balanceStart: 0,
        payment: 0,
        interest: 0,
        principal: 0,
        bonusPayment: 0,
        balanceEnd: 0,
        cumPayment,
        cumInterest,
        cumPrincipal,
      })
      continue
    }

    const interest = balanceStart * monthlyRate
    const payment = Math.min(basePayment, balanceStart + interest)
    const principal = payment - interest

    let bonusPayment = 0
    const balanceAfterPrincipal = balanceStart - principal
    if (input.bonusFlag && month % 6 === 0 && balanceAfterPrincipal > 0) {
      bonusPayment = Math.min(input.bonusAmount, balanceAfterPrincipal)
    }

    const balanceEnd = Math.max(balanceStart - principal - bonusPayment, 0)

    cumPayment += payment + bonusPayment
    cumInterest += interest
    cumPrincipal += principal + bonusPayment

    rows.push({
      month,
      year,
      balanceStart,
      payment,
      interest,
      principal,
      bonusPayment,
      balanceEnd,
      cumPayment,
      cumInterest,
      cumPrincipal,
    })

    balanceStart = balanceEnd
  }

  return rows
}

/**
 * 指定した月数経過時点の期末残高を取得する。
 * 月数がローン返済表の配列長を超える場合（保有年数がローン年数より長い等）は完済済みとして0を返す。
 */
export function getBalanceAtMonth(monthly: MonthlyRow[], month: number): number {
  if (month <= 0) return monthly[0]?.balanceStart ?? 0
  const row = monthly[month - 1]
  return row ? row.balanceEnd : 0
}
