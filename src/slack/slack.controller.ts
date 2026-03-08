import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { SlackInteractionDto } from './dto/slack-interaction.dto';
import { SlackSignatureService } from './slack-signature.service';
import { SummarizeService } from '../summarize/summarize.service';

// /slack
@Controller('slack')
export class SlackController {
  constructor(
    private readonly slackSignatureService: SlackSignatureService,
    private readonly summarizeService: SummarizeService,
  ) {}

  @Post('interactions')
  @HttpCode(200)
  async handleInteraction(
    @Body() body: SlackInteractionDto,
    @Headers() headers: Record<string, string>,
  ) {
    this.slackSignatureService.verify(
      headers['x-slack-signature'],
      headers['x-slack-request-timestamp'],
      JSON.stringify(body),
    );

    const payload = JSON.parse(body.payload);

    const channelId = payload.channel.id;
    const threadTs = payload.message.thread_ts || payload.message.ts;

    await this.summarizeService.summarizeThread(channelId, threadTs);

    return { ok: true };
  }
}