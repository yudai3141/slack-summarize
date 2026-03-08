import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SlackSignatureService {
  constructor(private readonly configService: ConfigService) {}

  verify(
    slackSignature: string,
    timestamp: string,
    body: string,
  ): void {
    const signingSecret = this.configService.get<string>('SLACK_SIGNING_SECRET');

    if (!signingSecret) {
      throw new UnauthorizedException('Missing signing secret');
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (Math.abs(currentTime - parseInt(timestamp, 10)) > 300) {
      throw new UnauthorizedException('Request too old');
    }

    const sigBasestring = `v0:${timestamp}:${body}`;

    const hash = crypto
      .createHmac('sha256', signingSecret)
      .update(sigBasestring)
      .digest('hex');

    const mySignature = `v0=${hash}`;

    if (mySignature !== slackSignature) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}