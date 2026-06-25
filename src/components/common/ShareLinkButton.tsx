import { useState } from 'react'
import './ShareLinkButton.css'

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードAPIが使えない環境ではURLを選択状態で表示するのみ（フォールバック）
      window.prompt('このURLをコピーしてください', window.location.href)
    }
  }

  return (
    <button type="button" className="share-link-button" onClick={handleClick}>
      {copied ? 'コピーしました！' : '結果をURLで共有'}
    </button>
  )
}
