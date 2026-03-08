# デプロイ情報

## 概要

Slack スレッド要約ボット - バックエンド API

## アーキテクチャ

- フレームワーク: NestJS (Node.js)
- ランタイム: Node.js 18.x 以上
- ビルド: TypeScript → JavaScript

---

## 必要な環境変数

### Slack 関連

| 変数名 | 説明 | 取得方法 |
|--------|------|----------|
| `SLACK_BOT_TOKEN` | Slack ボットトークン | Slack App 設定 > OAuth & Permissions > Bot User OAuth Token |
| `SLACK_SIGNING_SECRET` | リクエスト署名検証用シークレット | Slack App 設定 > Basic Information > Signing Secret |

### AWS 関連

| 変数名 | 説明 | 値の例 |
|--------|------|--------|
| `AWS_REGION` | AWS リージョン | `us-east-1`, `ap-northeast-1` など |
| `BEDROCK_MODEL_ID` | 使用する Bedrock モデル ID | `anthropic.claude-3-haiku-20240307-v1:0` |

### AWS IAM 権限

Lambda/ECS の実行ロールに以下の権限が必要：

- `bedrock:InvokeModel` - Bedrock モデルの呼び出し

---

## API エンドポイント

### POST /slack/interactions

Slack からの Message Shortcut を受け取るエンドポイント

**リクエスト:**
- Content-Type: `application/x-www-form-urlencoded`
- Body: `payload=<JSON文字列>`
- Headers:
  - `x-slack-signature`: Slack の署名
  - `x-slack-request-timestamp`: リクエストのタイムスタンプ

**レスポンス:**
- Status: `200 OK`
- Body: `{ "ok": true }`

---

## ビルド・起動コマンド

### 開発環境

```bash
npm install
npm run start:dev
```

### 本番環境

```bash
npm install --production
npm run build
npm run start
```

---

## デプロイ方法（推奨）

### Lambda + API Gateway

1. **ビルド**
   ```bash
   npm install
   npm run build
   ```

2. **依存関係を含めてパッケージ化**
   ```bash
   zip -r function.zip dist node_modules package.json
   ```

3. **Lambda にアップロード**
   - ランタイム: Node.js 18.x
   - ハンドラー: `dist/main.handler`（※要アダプター追加）
   - タイムアウト: 30秒以上（Bedrock API 呼び出しのため）
   - メモリ: 512MB 以上

4. **API Gateway 設定**
   - エンドポイント: `POST /slack/interactions`
   - Lambda プロキシ統合を有効化

### 注意事項

- **Lambda 用アダプター**: NestJS を Lambda で動かすには `@vendia/serverless-express` などのアダプターが必要です
- **タイムアウト**: Bedrock API のレスポンスに時間がかかる場合があるため、十分なタイムアウト設定が必要
- **環境変数**: Lambda の環境変数設定、または AWS Secrets Manager を使用

---

## Slack App の設定

デプロイ後、Slack App の設定で以下を行う必要があります：

### 1. Request URL の設定

**Interactivity & Shortcuts** セクション
- Request URL: `https://<your-api-gateway-url>/slack/interactions`

### 2. Message Shortcut の作成

- Name: "Summarize Thread"（任意）
- Short Description: "スレッドを要約します"
- Callback ID: 任意（アプリ内では使用していない）

### 3. OAuth Scopes の設定

**Bot Token Scopes:**
- `channels:history` - チャンネルのメッセージ履歴を読む
- `groups:history` - プライベートチャンネルのメッセージ履歴を読む
- `chat:write` - メッセージを投稿する

---

## トラブルシューティング

### 署名検証エラー

- `SLACK_SIGNING_SECRET` が正しく設定されているか確認
- タイムスタンプが5分以上古い場合はエラーになる

### Bedrock API エラー

- `AWS_REGION` が Bedrock が利用可能なリージョンか確認
- IAM ロールに `bedrock:InvokeModel` 権限があるか確認
- モデル ID が正しいか確認

### タイムアウトエラー

- Lambda のタイムアウト設定を確認（30秒以上推奨）
- API Gateway のタイムアウト設定を確認

---

## 連絡先

- バックエンド担当: [あなたの名前]
- インフラ担当: [インフラエンジニアの名前]
