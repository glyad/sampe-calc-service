import { IOperand, IOperator } from '../contracts';
import { Expression } from './expression';

export abstract class OperatorBase extends Expression<number | Error> implements IOperator<number> {
    public abstract value: any;
    public operands: IOperand<number>[];

    constructor(operands: IOperand<number>[] = []) {
        super();
        this.operands = operands;
    }
}

