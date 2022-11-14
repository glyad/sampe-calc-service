import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ValidationOptions } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';
import { ExpressionDto } from './expression-dto';
import { OperandDto } from './operand-dto';

@OpenAPI({ 'x-examples': [
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
export class OperatorDto  extends ExpressionDto {
    type: string;
    @ArrayMinSize(2,
        <ValidationOptions>{
            message: 'The array size must be 2.'
        })
    @ArrayMaxSize(2,
        <ValidationOptions>{
            message: 'The array size must be 2.'
        })
    @Type(() => OperandDto)
    operands: OperandDto[] = [];
}
