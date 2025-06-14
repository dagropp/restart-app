const nullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || typeof value === 'undefined';

const object = (value: unknown): value is object =>
  !nullOrUndefined(value) && typeof value === 'object';

export const is = { nullOrUndefined, object };
