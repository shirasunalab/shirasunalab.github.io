# 開発環境セットアップ手順

このリポジトリをローカルで動かすための手順です（Windows 向け）。

1. Node バージョン管理

- 推奨 Node バージョンは `20` です。.nvm を使う場合は次のように切り替えてください。

```
nvm install 20
nvm use 20
```

Windows で `nvm-windows` を使っている場合は同様に `nvm use 20` を実行してください。

2. 依存関係のインストール（自動）

レポジトリルートで以下を実行します。

```
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1
```

このスクリプトは `corepack enable` を試行し、`pnpm` を利用して依存関係をインストールします。

3. 開発サーバーの起動

依存がインストールできたら次で起動します。

```
pnpm dev
```

4. メモ

- エディタは `.nvmrc` を参照するので、使用する Node バージョンを合わせてください。
- 他の OS を使っている場合は、同様に `nvm` または `volta` 等で Node を切り替えてから上記スクリプトを実行してください。

5. 仮想環境確認スクリプト

プロジェクトルートには PowerShell で仮想環境の状態を確認するスクリプトがあります:

```
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\show-env.ps1
```

このスクリプトはアクティブな Python 仮想環境（`VIRTUAL_ENV`、Conda）を検出し、Python のバージョンとプレフィックスを表示します。`.venv` や `venv` ディレクトリがあればアクティベート方法も案内します。

