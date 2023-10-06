import { CaseType, convertCase } from './convert-case';

/**
 * Options in order of priority (the ones in the top are applied first)
 */
export interface TransformObjectOptions {
  /** List of keys to drop from the object */
  keyDrop?: string[];
  /** List of keys to leave as they are*/
  keyBypass?: string[];
  /** Custom transformations for the specified keys */
  keyTransform?: Record<string, string>;
  /** Convert the casing of the object keys */
  keyCase?: {
    from?: CaseType;
    to?: CaseType;
  };
  /** Trasformations to apply to the values of the specified keys */
  valueTransform?: Record<string, (oldValue?: any) => any>;
}

interface InternalOptions {
  keyDrop?: string[];
  keyConversor: (oldKey: string) => string;
  valueConversor?: (oldKey: string, oldValue: any) => any;
}

export function transformObject<T extends Record<string, any>>(
  obj: T,
  options: TransformObjectOptions = {}
) {
  const internalOptions = getInternalOptions(options);
  return transform(obj, internalOptions);
}

function transform(obj: any, options: InternalOptions): any {
  if (typeof obj !== 'object') return obj;
  const { keyConversor, valueConversor, keyDrop } = options;

  if (Array.isArray(obj)) {
    return obj.map((item) => transform(item, options));
  }

  return Object.entries(obj).reduce((convertedObj, [oldKey, oldValue]) => {
    if (keyDrop?.includes(oldKey)) return transformObject;

    const newKey = keyConversor ? keyConversor(oldKey) : oldKey;
    const newValue =
      oldValue && typeof oldValue === 'object'
        ? transform(oldValue, options)
        : valueConversor
        ? valueConversor(oldKey, oldValue)
        : oldValue;
    convertedObj[newKey] = newValue;
    return convertedObj;
  }, {} as Record<string, any>);
}

function getInternalOptions(options: TransformObjectOptions): InternalOptions {
  return {
    keyDrop: options.keyDrop,
    keyConversor: getKeyConversor(options),
    valueConversor: getValueConversor(options),
  };
}

function getKeyConversor({
  keyCase,
  keyTransform,
  keyBypass: keyByPass,
}: TransformObjectOptions): InternalOptions['keyConversor'] {
  let caseTransform: undefined | ((oldKey: string) => string);
  if (keyCase) {
    if (typeof keyCase === 'function') return keyCase;
    const from = keyCase.from || 'snake';
    const to = keyCase.to || 'camel';
    caseTransform = (oldKey: string) => convertCase(oldKey, from, to);
  }

  return (oldKey: string): string => {
    if (keyByPass?.includes(oldKey)) return oldKey;

    const transform = keyTransform?.[oldKey];
    if (transform) return transform;

    if (caseTransform) {
      return caseTransform(oldKey);
    }

    return oldKey;
  };
}

function getValueConversor({
  valueTransform,
}: TransformObjectOptions): InternalOptions['valueConversor'] {
  if (!valueTransform) return;
  return (oldKey: string, oldValue: any) => {
    const fn = valueTransform[oldKey];
    return fn ? fn(oldValue) : oldValue;
  };
}
