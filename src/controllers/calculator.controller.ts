/* eslint-disable no-unused-vars */
import { autoinject, transient } from 'aurelia-dependency-injection';
import { Get, Post, Body, JsonController, HttpCode, Header } from 'routing-controllers';
import { DataService } from '../model/data.service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Operand, AddOperator, SubstractOperator } from '../model/implementation';
import { OperatorDto, ResultDto } from '../dto';
import { Mapper } from '../model/mapper';

@JsonController('/calculator')
@autoinject
@transient(CalculatorController)
@OpenAPI({
  summary: 'The Calculator API',
  tags: ['Calculator'],
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

        const tree = await Mapper.map(expression);
        const result = new ResultDto();
        result.value = (await this.dataService.evaluate(tree)).toString();
        result.type = 'number';

        return result;
    }

}
