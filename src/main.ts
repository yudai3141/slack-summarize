import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
    // TODO: NestFactory.create() でアプリケーションを作成
    const app = await NestFactory.create(AppModule);

    // TODO: グローバルに ValidationPipe を設定
    const pipe = new ValidationPipe({
        whitelist: true, // 未定義のプロパティを除去
        transform: true, // 送られたjsonデータをDTOに自動変換
    });
    app.useGlobalPipes(pipe);

    // TODO: ポート 3000 でアプリケーションを起動
    await app.listen(3000);

    // TODO: 起動完了メッセージをログ出力
    console.log('Application is running on http://localhost:3000')
}
bootstrap().catch((error) => {
    console.error('Application failed to start:', error);
    process.exit(1);
});