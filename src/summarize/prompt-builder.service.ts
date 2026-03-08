import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptBuilderService {
  buildSummaryPrompt(
    messages: Array<{ user: string; text: string; ts: string }>,
  ): string {
    const conversation = messages
      .map((msg) => `[${msg.user}]: ${msg.text}`)
      .join('\n');

    return `以下の Slack スレッドを要約してください。

---
${conversation}
---

要約は簡潔に、重要なポイントを箇条書きで示してください。`;
  }
}