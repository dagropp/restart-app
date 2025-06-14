export type Key<T extends object> = keyof T;
export type Value<T extends object> = T[keyof T];
export type Entry<T extends object> = [Key<T>, Value<T>];

const keys = <T extends object>(object: T): Key<T>[] =>
  Object.keys(object) as (keyof T)[];

const values = <T extends object>(object: T): Value<T>[] =>
  Object.values(object) as T[keyof T][];

const entries = <T extends object>(object: T): Entry<T>[] =>
  Object.entries(object) as [keyof T, T[keyof T]][];

const fromEntries = <T extends object>(entries: Entry<T>[]): T =>
  Object.fromEntries(entries) as T;

export const object = { keys, values, entries, fromEntries };
