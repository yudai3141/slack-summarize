import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WebClient } from "@slack/web-api";

@Injectable()
export class SlackService {
    private client: WebClient;

    constructor(private readonly configService: ConfigService) {
        const token = this.configService.get<string>('SLACK_BOT_TOKEN');
        this.client = new WebClient(token);
    }

    async getThreadMessages(
        channelId: string,
        threadTs: string,
    ): Promise<Array<{user: string; text: string, ts: string}>> {
        const result = await this.client.conversations.replies({
            channel: channelId,
            ts: threadTs,
        });

        const messages = result.messages || [];

        return messages
        .filter((msg) => (msg as any).subtype !== 'bot_message')
        .map((msg) => ({
            user: msg.user || 'unknown',
            text: msg.text || '',
            ts: msg.ts || '',
        }));
    }

    async postMessage(
        channelId: string,
        threadTs: string,
        text: string,
    ): Promise<void> {
        await this.client.chat.postMessage({
            channel: channelId,
            thread_ts: threadTs,
            text: text,
        });
    }
}