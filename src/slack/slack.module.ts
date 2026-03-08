import { Module, forwardRef } from "@nestjs/common";
import { SlackController } from "./slack.controller";
import { SlackService } from "./slack.service";
import { SlackSignatureService } from "./slack-signature.service";
import { SummarizeModule } from "../summarize/summarize.module";

@Module({
  imports: [forwardRef(() => SummarizeModule)],
  controllers: [SlackController],
  providers: [SlackService, SlackSignatureService],
  exports: [SlackService],
})
export class SlackModule {}