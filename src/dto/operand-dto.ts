import { OpenAPI } from 'routing-controllers-openapi';
import { ExpressionDto } from './expression-dto';
import { Type } from 'class-transformer';
import { IsNumber, IsNumberString } from 'class-validator';

@OpenAPI({
    'title': 'The OperandDto.',
    'description': 'The DTO for the operand expression.', 
    'x-examples': [
    `{
        "type": "AddOperator",
        "operands": [
          {
             "value": 3
          },
          {
             "type": "SubstractOperator",
             "operands": [
               {
                   "value": 10
               },
               {
                   "value": 5
               }
            ]
          }
        ]
      }`
] })
export class OperandDto extends ExpressionDto {
    @Type(() => Number)
    @Type(() => String)
    @IsNumberString({}, { message: 'The value must be a string representing the number.' })
    @IsNumber({}, { message: 'The value must be a number.'})
    value: number | string;
}
