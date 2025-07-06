const nullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || typeof value === 'undefined';

const object = (value: unknown): value is object =>
  !nullOrUndefined(value) && typeof value === 'object';

const emptyObject = (value?: object): value is undefined =>
  !object(value) || Object.keys(value).length === 0;

export const is = { nullOrUndefined, object, emptyObject };
