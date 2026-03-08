import { Injectable } from '@nestjs/common';
import { SlackService } from '../slack/slack.service';
import { BedrockService } from '../bedrock/bedrock.service';
import { PromptBuilderService } from './prompt-builder.service';

@Injectable()
export class SummarizeService {
  constructor(
    private readonly slackService: SlackService,
    private readonly bedrockService: BedrockService,
    private readonly promptBuilderService: PromptBuilderService,
  ) {}

  async summarizeThread(channelId: string, threadTs: string): Promise<void> {
    const messages = await this.slackService.getThreadMessages(
      channelId,
      threadTs,
    );

    const prompt = this.promptBuilderService.buildSummaryPrompt(messages);

    const summary = await this.bedrockService.generateSummary(prompt);

    await this.slackService.postMessage(channelId, threadTs, summary);
  }
}