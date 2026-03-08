import { Module, forwardRef } from '@nestjs/common';
import { SlackModule } from '../slack/slack.module';
import { BedrockModule } from '../bedrock/bedrock.module';
import { SummarizeService } from './summarize.service';
import { PromptBuilderService } from './prompt-builder.service';

@Module({
  imports: [forwardRef(() => SlackModule), BedrockModule],
  providers: [SummarizeService, PromptBuilderService],
  exports: [SummarizeService],
})
export class SummarizeModule {}