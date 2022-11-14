import { IExpression } from '../contracts';

export abstract class Expression<T> implements IExpression<T> {
    public value: T;

    public toString(): string {
        return this.toStringImplementation();
    }

    protected abstract toStringImplementation(): string;
}
