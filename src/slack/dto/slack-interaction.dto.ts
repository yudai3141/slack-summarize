import { IsString, IsNotEmpty } from "class-validator";

// slackから送られるリクエストボディのDTO定義
export class SlackInteractionDto {
    // payloadフィールドを定義
    // slackは全てのデータをJSON文字列としてpayloadに入れて送る
    @IsString()
    @IsNotEmpty()
    payload: string;
}

// payloadの中身（パースした後）の型を定義
export class SlackMessageAction {
    type: string;
    channel: SlackChannel;
    message: SlackMessage;
}

export class SlackChannel {
    id: string
}

export class SlackMessage {
    ts: string;
    thread_ts?: string;
}