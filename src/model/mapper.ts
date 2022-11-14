import { OperandDto, OperatorDto } from '../dto';
import { IOperator } from './contracts';
import { Operand } from './implementation';

export class Mapper {
    
    private static readonly toKebabCase = string => string
                                .replace(/([a-z])([A-Z])/g, '$1-$2')
                                .replace(/[\s_]+/g, '-')
                                .toLowerCase();

    public static async map(source: OperatorDto): Promise<IOperator<number>> {
        
        const module = await import(`../model/implementation/${Mapper.toKebabCase(source.type)}`);
        const instance = new module[source.type]();

        for (let i = 0; i < source.operands.length; i++) {
            const op = source.operands[i];
            if (!Object.getOwnPropertyDescriptor(op, 'type')) {
                instance.operands.push(new Operand<number>(+(<OperandDto>op).value.toString()));
            } else {
                instance.operands.push(await this.map(<OperatorDto>op));
            }
        }
        return instance;
    }
}
