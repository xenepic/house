# 住宅購入・実質家賃シミュレーター

住宅を購入し、一定年数保有した後に売却した場合の「実質家賃」をシミュレーションするWebツールです。
完全無料・登録不要・サーバー送信なし（入力内容はブラウザのlocalStorageにのみ保存されます）。

元になった計算ロジックは `住宅購入_売却時実質家賃シミュレーション.xlsx`（Excel版）を参照してください。
ローン返済・年次集計・売却精算・実質家賃結果・シナリオ比較の計算式はすべてExcel版と同じです。

## ローカルでの起動

```bash
npm install
npm run dev      # http://localhost:5173 で起動
```

## ビルド・テスト

```bash
npm run build    # 型チェック + 本番ビルド（dist/に出力）
npm run test     # vitestで計算ロジック・状態管理の単体テストを実行
npm run lint      # oxlintで静的解析
```

## デプロイ

Vercel / Netlify でのデプロイを想定した静的サイト構成です。

- Build command: `npm run build`
- Output directory: `dist`

## ディレクトリ構成

- `src/domain/` — 計算ロジック（PMT、月次ローン返済表、年次集計、売却精算、実質家賃結果、シナリオ比較）。Reactに依存しないpure functionで、`__tests__/`に単体テストがあります。Excel版で検証済みの数値をフィクスチャとして使っています。
- `src/state/` — 入力state管理。URLクエリパラメータ・localStorage・デフォルト値の優先順位で初期値を決定し、変更をデバウンスして両方に同期します。
- `src/context/` — `SimulationProvider`が入力stateと計算結果(`runFullSimulation`の戻り値)をReact Contextで配布します。
- `src/components/` — UIコンポーネント（layout / input / results / details / common）。

## 計算ロジックを拡張する場合

新しい入力パラメータや計算項目を追加する際は、まず `src/domain/types.ts` の型定義と `src/domain/constants.ts` のデフォルト値を更新し、関連する `src/domain/*.ts` の計算関数とそのテストを更新してください。UIコンポーネントは `runFullSimulation()` の戻り値のみを参照しているため、計算ロジックとUIの変更を分離して進められます。
