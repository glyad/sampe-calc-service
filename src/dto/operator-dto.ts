import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidationOptions } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';
import { ExpressionDto } from './expression-dto';
import { OperandDto } from './operand-dto';

@OpenAPI({ 
    'description': 'The DTO for the operator expression.',
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
    @Type(() => OperatorDto)
    @IsArray({ message: 'The value must be an array of ExpressionDto objects.' } as ValidationOptions)
    operands: ExpressionDto[] = [];
}
