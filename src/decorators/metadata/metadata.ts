import 'reflect-metadata';
import { HandlerFunction, MethodName } from './../interfaces';

export function defineMetadata<T>(
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<HandlerFunction>,
  namespace: MethodName,
  options: T,
) {
  let metadata = Reflect.getMetadata('tlgrf:decorators', target, key);

  if (!metadata) {
    metadata = initialMetadata();
  }

  metadata[namespace].push({ target, key, descriptor, options });

  Reflect.defineMetadata('tlgrf:decorators', metadata, target, key);
}

interface IMetadata {
  [key: string]: string[];
}

function initialMetadata() {
  return new Proxy({}, {
    get(target: IMetadata, prop: MethodName) {
      if (!(prop in target)) {
        target[prop] = [];
      }
      return target[prop];
    },
  })
};
