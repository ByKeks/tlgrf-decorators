import { MethodName } from './interfaces';
import { createDecorator } from './factory';

export const Action = createDecorator<string | string[] | RegExp | RegExp[]>(MethodName.action);
