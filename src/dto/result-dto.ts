import { OpenAPI } from 'routing-controllers-openapi';
import { ExpressionDto } from './expression-dto';
import { Type } from 'class-transformer';
import { IsString, ValidationOptions } from 'class-validator';

@OpenAPI({ 'x-examples': [
    `{
        "type": "string",
        "value": "22"
      }`
] })
export class ResultDto  extends ExpressionDto {
    @Type(() => String)
    @IsString({ message: 'The value must be a string.'  } as ValidationOptions)
    type: string;

    @Type(() => String)
    @IsString()
    value: string;
}
