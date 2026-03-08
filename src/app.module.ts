import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { SlackModule } from './slack/slack.module';
import { BedrockModule } from './bedrock/bedrock.module';
import { SummarizeModule } from './summarize/summarize.module';

@Module({
  imports: [
    ConfigModule,
    SlackModule,
    BedrockModule,
    SummarizeModule,
  ],
})
export class AppModule {}