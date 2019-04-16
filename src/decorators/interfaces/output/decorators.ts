import { ContextMessageUpdate } from 'telegraf';

export type Options = string | string[] | RegExp | RegExp[] | (() => void);

export type HandlerFunction = (ctx: ContextMessageUpdate) => any;

export type MethodNameUnion = 'action' | 'cashtag' | 'command' | 'entity' |
                              'gameQuery' | 'hashtag' | 'hears' | 'inlineQuery' |
                              'mention' | 'on' | 'phone' | 'use';

export enum MethodName {
  action = 'action',
  cashtag = 'cashtag',
  command = 'command',
  entity = 'entity',
  gameQuery = 'gameQuery',
  hashtag = 'hashtag',
  hears = 'hears',
  inlineQuery = 'inlineQuery',
  mention = 'mention',
  on = 'on',
  phone = 'phone',
  use = 'use',
}

export interface IDecorator {
  target: any;
  key: string;
  descriptor: TypedPropertyDescriptor<HandlerFunction>;
  options: Options;
}

export { ContextMessageUpdate };
