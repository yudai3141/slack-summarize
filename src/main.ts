import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';
import * as express from 'express';

let cachedServer: Handler;

// Lambda用のサーバー初期化（初回のみ実行、以降はキャッシュを使用）
async function bootstrapServer(): Promise<Handler> {
    if (!cachedServer) {
        const expressApp = express();

        // Slackの署名検証のために生のボディを保存
        expressApp.use('/slack', express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));
        expressApp.use('/slack', express.urlencoded({ extended: true, verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));

        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );

        // グローバルに ValidationPipe を設定
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
        }));

        await app.init();

        cachedServer = serverlessExpress({ app: expressApp });
    }

    return cachedServer;
}

// Lambda ハンドラー（AWS Lambdaから呼ばれる）
export const handler: Handler = async (event, context, callback) => {
    const server = await bootstrapServer();
    return server(event, context, callback);
};

// ローカル開発用（直接実行した場合のみ起動）
if (require.main === module) {
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        // Slackの署名検証のために生のボディを保存
        app.use('/slack', express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));
        app.use('/slack', express.urlencoded({ extended: true, verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
        }));

        await app.listen(3000);
        console.log('Application is running on http://localhost:3000');
    }

    bootstrap().catch((error) => {
        console.error('Application failed to start:', error);
        process.exit(1);
    });
}