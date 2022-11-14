import { OperatorDto } from '../../dto';
import { IOperand } from '../contracts';
import { OperatorBase } from './operator-base';


export class SubstractOperator extends OperatorBase {

    constructor(operands: IOperand<number>[] = []) {
        super(operands);
    }

    public get value(): number {

        if (this.operands.length != 2) {
            throw new Error('Must have 2 operands');
        }
        return this.operands[0].value - this.operands[1].value;
    }

    protected toStringImplementation(): string {
        return `${this.operands[0].toString()} - ${this.operands[1].toString()}`;
    }

    // eslint-disable-next-line no-unused-vars
    public static fromDto(operatorDto: OperatorDto): OperatorBase {
        return new SubstractOperator();
    }
}
