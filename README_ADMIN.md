# 管理画面（Admin）設定

このプロジェクトには簡易管理画面が組み込まれています。複数人での運用に備え、管理画面と管理 API を BasicAuth で保護します。

必須環境変数（ローカル開発では `.env.local` に追加）:

- `ADMIN_USER` / `ADMIN_PASS` — 既存の管理ログイン認証（管理 UI 用、`admin/login` で使用）
- `ADMIN_SECRET` — セッション HMAC 用の強力なランダム文字列（例: 32+ バイトのランダム）
- `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS` — middleware の BasicAuth 用ユーザー・パスワード

例（`.env.local`）:

```
ADMIN_USER=admin
ADMIN_PASS=your_admin_password_here
ADMIN_SECRET=replace_with_generated_secret
ADMIN_BASIC_USER=admin
ADMIN_BASIC_PASS=another_password_for_basic_auth

# Next.js 環境
NODE_ENV=development
```

秘密の生成方法（Windows / PowerShell）:

```
# ルートで実行
powershell -ExecutionPolicy Bypass -File .\scripts\generate_admin_secret.ps1
# 出力された文字列を .env.local の ADMIN_SECRET に貼り付ける
```

または Linux / macOS の場合は `openssl rand -hex 32` を利用できます。


使い方:

1. `pnpm install` して `pnpm dev` で起動。
2. ブラウザで `/admin` にアクセスすると、まず BasicAuth のダイアログが出ます（ブラウザにより挙動は異なります）。
3. BasicAuth 通過後、管理画面のログインフォームを使って `ADMIN_USER`/`ADMIN_PASS` でサインインしてください。

セキュリティ注意点:

- `.env.local` は `.gitignore` に含められていますが、誤ってコミットしないでください。
- 本番では HTTPS を必須にし、`ADMIN_SECRET` を安全に保管してください。
- 将来的には NextAuth 等の堅牢な認証プロバイダへの移行、2FA の追加、アクセス監査とロール管理の導入を検討してください。

追加で行ったセキュリティ強化:

- **タイミング攻撃対策**: 管理者のユーザー名／パスワード比較に timing-safe 比較を導入しました。これにより短時間での文字列差からの判定が難しくなります。
- **ログイン・保存 API のレート制限（簡易）**: 同一 IP からの急速なリクエストを短時間で制限します（ローカルのメモリ実装のため、本番では Redis 等の共有ストアを推奨します）。
- **クッキー設定の修正**: セッティング時のバグを修正し、トークンを `encodeURIComponent` して cookie に格納するようにしました。本番では `NODE_ENV=production` で `Secure` フラグが付与されます。

注意: 追加の強化（推奨） — 運用開始前に実施してください:

- 本格運用では `NextAuth` 等の外部認証プロバイダ導入、または 2FA の追加を検討してください。
- ログイン試行の永続的な記録・分散レート制限には Redis などを用いること。
- middleware の新しい推奨仕様（proxy）への移行を検討してください（現在は互換のため `middleware.ts` を使用しています）。
