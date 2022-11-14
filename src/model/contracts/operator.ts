import { IOperand } from './operand';
import { IExpression } from './expression';

export interface IOperator<T> extends IExpression<T> {
    operands: IOperand<T>[];
}
