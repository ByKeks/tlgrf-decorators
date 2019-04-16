import { MethodName } from './interfaces';
import { createDecorator } from './factory';

export const Command = createDecorator<string | string[]>(MethodName.command);
export const Settings = Command('settings');
export const Start = Command('start');
export const Help = Command('help');
