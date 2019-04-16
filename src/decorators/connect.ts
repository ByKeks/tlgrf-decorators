import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { HandlerFunction, IDecorator, MethodNameUnion } from './interfaces';

function Connect(bot: Telegraf<ContextMessageUpdate>) {
  return <T extends new(...args: any[]) => {}>(constructor: T) => {
    return class extends constructor {
      [methodName: string]: HandlerFunction;

      constructor(...args: any[]) {
        super(...args);

        Object.getOwnPropertyNames(constructor.prototype).map((key: string) => {
          if (!Reflect.hasMetadata('tlgrf:decorators', this, key)) { return; }
          const metadata = Reflect.getMetadata('tlgrf:decorators', this, key);

          Object.keys(metadata).map((methodName: MethodNameUnion) => {
            metadata[methodName].map((decorator: IDecorator) => {
              // @ts-ignore
              bot[methodName](decorator.options, decorator.descriptor.value);
            });
          });
        });
      }
    };
  };
}

export { Connect };
