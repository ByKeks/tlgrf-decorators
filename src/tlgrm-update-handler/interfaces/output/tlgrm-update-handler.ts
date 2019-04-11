import { ContextMessageUpdate } from './../input';

export type HandlerFunction = (ctx: ContextMessageUpdate) => any;

export interface ITlgrmUpdateHandler {
  [methodName: string]: HandlerFunction;
}

export { ContextMessageUpdate };
