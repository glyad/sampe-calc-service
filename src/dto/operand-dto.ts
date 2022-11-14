import { ExpressionDto } from './expression-dto';

export class OperandDto extends ExpressionDto {
    value: number | string;
}
