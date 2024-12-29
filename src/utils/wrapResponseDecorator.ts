export function WrapResponseDecorator(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // 调用原始方法并获取其结果
    const result = originalMethod.apply(this, args);

    if (result instanceof Promise) {
      return result.then((data) => ({ data: data, code: 0 }));
    }

    return { data: result, code: 0 };
  };

  return descriptor;
}
