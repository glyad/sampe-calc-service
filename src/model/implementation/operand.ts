import { IOperand } from '../contracts';
import { Expression } from './expression';

export class Operand<T> extends Expression<T> implements IOperand<T> {
    constructor(value: T) { 
        super();
        this.value = value;
    }
    
    protected toStringImplementation(): string {
        return `${this.value.toString()}`;
    }

}
