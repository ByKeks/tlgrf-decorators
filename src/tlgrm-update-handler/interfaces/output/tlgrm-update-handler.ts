import { ContextMessageUpdate } from './../input';

export interface ITlgrmUpdateHandler {
  [methodName: string]: (ctx: ContextMessageUpdate) => void|Promise<any>;
}

export { ContextMessageUpdate };
