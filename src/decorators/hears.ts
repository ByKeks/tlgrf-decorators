import { MethodName } from './interfaces';
import { createDecorator } from './factory';

export const Hears = createDecorator<string | string[] | RegExp | RegExp[]>(MethodName.hears);
