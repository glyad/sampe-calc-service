/* eslint-disable no-unused-vars */
import { singleton } from 'aurelia-dependency-injection';
import { IExpression } from './contracts';

@singleton()
export class DataService {

  private counter: number = 0;

  public async evaluate(expression: IExpression<number>): Promise<number> {    
    return this.createPromise(expression.value);
  }

  public async expressionToString(expression: IExpression<number>): Promise<string> {
    return this.createPromise(expression.toString());
  }

  private createPromise(data: any, timeout: number = 100): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(data);
        } catch (error: unknown) {
          reject(error);
        }
      }, timeout);
    });
  }
}
