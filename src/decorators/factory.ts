import { HandlerFunction, MethodName } from './interfaces';
import { defineMetadata } from './metadata';

export function createDecorator<T>(name: MethodName) {
  const decorator = <R extends HandlerFunction>(options: T) => {
    return (target: any, key: string, descriptor: TypedPropertyDescriptor<R>): TypedPropertyDescriptor<R> => {
      if (!descriptor || (typeof descriptor.value !== 'function')) {
        throw new TypeError(`Only methods can be decorated with @command. <${key}> is not a method!`);
      }

      defineMetadata<T>(target, key, descriptor, name, options);

      return descriptor;
    };
  };

  return decorator;
}
