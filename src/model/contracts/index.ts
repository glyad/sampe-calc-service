import { IExpression } from './expression';

export * from './expression';
export * from './operand';
export * from './operator';

export interface IResult extends IExpression<number | Error> {}
