import { ContextMessageUpdate } from './../input';

export type HandlerFunction = (ctx: ContextMessageUpdate) => void|Promise<any>;

export interface ITlgrmUpdateHandler {
  [methodName: string]: HandlerFunction;
}

export { ContextMessageUpdate };
