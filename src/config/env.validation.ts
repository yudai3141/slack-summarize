import { plainToClass } from "class-transformer";
import { IsString, IsNotEmpty, validateSync } from "class-validator";

class EnvironmentVariables {
    @IsString()
    @IsNotEmpty()
    SLACK_BOT_TOKEN: string;

    @IsString()
    @IsNotEmpty()
    SLACK_SIGNING_SECRET: string;

    @IsString()
    @IsNotEmpty()
    AWS_REGION: string;

    @IsString()
    @IsNotEmpty()
    BEDROCK_MODEL_ID: string;
}

export function validate(config: Record<string, unknown>) {
    // config をEnvironmentVariables に変換
    const validatedConfig = plainToClass(EnvironmentVariables, config);

    // validateSync でバリデーションを実行
    const errors = validateSync(validatedConfig);

    // エラーがあれば、エラーメッセージを throw
    if (errors.length > 0) {
        throw new Error(errors.toString());
    } else {
        // エラーがなければバリデーション済みの config を返す
        return validatedConfig;
    }

}