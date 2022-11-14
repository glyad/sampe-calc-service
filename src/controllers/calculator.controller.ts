/* eslint-disable no-unused-vars */
import { autoinject, transient } from 'aurelia-dependency-injection';
import { Param, Get, Post, Delete, Put, Body, JsonController, HttpCode, Header } from 'routing-controllers';
import { DataService } from '../model/data.service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Operand } from '../model/implementation/operand';
import { AddOperator, SubstractOperator } from '../model/implementation';
import { ExpressionDto, OperandDto, OperatorDto, ResultDto } from '../dto';

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

  @Get('/json')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('X-Powered-By', 'David Kossoglyad')
  @OpenAPI({ summary: 'Return a json.' })
  public async getAsJson(): Promise<string> {
    const tree: any = new AddOperator(
        [
            new Operand<number>(3),
            new SubstractOperator([
                new Operand<number>(10),
                new Operand<number>(5)
            ])            
        ]
    );
    
    return JSON.stringify(tree);
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

    const x = expression;
    
    const tree: any = new AddOperator(
        [
            new Operand<number>(3),
            new SubstractOperator([
                new Operand<number>(10),
                new Operand<number>(5)
            ])            
        ]
    );

    let result = new ResultDto();
    result.value = (await this.dataService.evaluate(tree)).toString();
    result.type = 'number';

    return result;
  }

}
