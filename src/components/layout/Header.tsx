import { ShareLinkButton } from '../common/ShareLinkButton'
import './Header.css'

export function Header() {
  return (
    <div className="app-header">
      <div className="app-header__row">
        <h1>住宅購入・実質家賃シミュレーター</h1>
        <ShareLinkButton />
      </div>
      <p className="app-header__badge">
        入力内容（金額データ）は外部に送信されません。匿名のアクセス解析（Vercel Analytics）を使用しています。
      </p>
    </div>
  )
}
