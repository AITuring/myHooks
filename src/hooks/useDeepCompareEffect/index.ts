import { useEffect, useRef } from "react";
function isObject(obj: unknown): obj is object {
  return obj !== null && typeof obj === "object";
}

function isEqual<T>(value: T, other: T): boolean {
  if (value === other) {
    return true;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  if (isObject(value) && isObject(other)) {
    const valueKeys = Object.keys(value);
    const otherKeys = Object.keys(other);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    for (const key of valueKeys) {
      if (
        !otherKeys.includes(key) ||
        isEqual(value[key as keyof T], other[key as keyof T])
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
}

function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  const previousDepsRef = useRef<any[]>([]);

  if (!isEqual(previousDepsRef.current, dependencies)) {
    previousDepsRef.current = dependencies;
  }

  useEffect(callback, [previousDepsRef.current]);
}

export default useDeepCompareEffect;
