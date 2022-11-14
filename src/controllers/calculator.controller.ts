/* eslint-disable no-unused-vars */
import { autoinject, transient } from 'aurelia-dependency-injection';
import { MappingProfile, createMap } from '@automapper/core';
import { Param, Get, Post, Delete, Put, Body, JsonController, HttpCode, Header } from 'routing-controllers';
import { DataService } from '../model/data.service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {  } from '../model/implementation';
import { Operand, AddOperator, SubstractOperator } from '../model/implementation';
import { OperandDto, OperatorDto, ResultDto } from '../dto';
import { IOperand, IOperator } from '../model/contracts';

@JsonController('/calculator')
@autoinject
@transient(CalculatorController)
@OpenAPI({
  security: [{ basicAuth: [] }],
})
export class CalculatorController {

  // eslint-disable-next-line no-unused-vars
  constructor(private dataService: DataService) {
  }

  @Get('/')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('X-Powered-By', 'David Kossoglyad')
  @OpenAPI({ summary: 'Return a string representation of the expression' })
  public async get(): Promise<string> {
    const tree: any = new AddOperator(
        [
            new Operand<number>(3),
            new SubstractOperator([
                new Operand<number>(10),
                new Operand<number>(5)
            ])            
        ]
    );
    const s = await this.dataService.expressionToString(tree);
    return s;
  }

 
    @HttpCode(200)
    @Post('/')
    @OpenAPI({ summary: 'Evaluates the expression', 'x-examples': [
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
          }`,
          `{
            "type": "AddOperator",
            "operands": [
              {
                 "value": 23
              },
              {
                 "type": "SubstractOperator",
                 "operands": [
                   {
                       "value": 23
                   },
                   {
                       "type": "AddOperator",
                       "operands": [
                           {
                               "value": 2
                           },
                           {
                               "value": -4
                           }
                       ]
                    }
                ]
              }
            ]
          }`
    ] })
    @Header('Cache-Control', 'none')
    @Header('X-Powered-By', 'David Kossoglyad')    
    @ResponseSchema(ResultDto, {
        contentType: 'application/json',
        description: 'The result.',
        statusCode: '200',
        isArray: false
      })
    public async calculate(@Body({validate: true }) expression: OperatorDto): Promise<ResultDto> {

        const tree = this.map(expression);
        const result = new ResultDto();
        result.value = (await this.dataService.evaluate(tree)).toString();
        result.type = 'number';

        return result;
    }

    map(source: OperatorDto): IOperator<number> {
        const instance = this.createOperator(source.type);
        source.operands.forEach(op => 
            {
                if (!Object.getOwnPropertyDescriptor(op, 'type')) {
                    instance.operands.push(new Operand<number>(+(<OperandDto>op).value.toString()));
                } else {
                    instance.operands.push(this.map(<OperatorDto>op));
                }
            });
        return instance;
    }

    createOperator(type: string): IOperator<number> {
        if (type === 'AddOperator') {
            return new AddOperator();
        }
        if (type === 'SubstractOperator') {
            return new SubstractOperator();
        }
    }

}
