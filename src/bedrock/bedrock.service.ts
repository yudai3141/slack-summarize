import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export class BedrockService {
  private client: BedrockRuntimeClient;
  private modelId: string;

  constructor(private readonly configService: ConfigService) {
    const awsRegion = this.configService.get<string>('AWS_REGION');

    this.client = new BedrockRuntimeClient({
      region: awsRegion,
    });

    this.modelId = 'anthropic.claude-3-haiku-20240307-v1:0';
  }

  async generateSummary(prompt: string): Promise<string> {
    const requestBody = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: JSON.stringify(requestBody),
    });

    const response = await this.client.send(command);

    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body),
    );

    return responseBody.content[0].text;
  }
}