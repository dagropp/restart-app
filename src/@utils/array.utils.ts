const getIndices = <T>(array: T[], indices: number[]) =>
  indices.map((index) => array[index]);

const joinWithLast = <T>(array: T[], joiner: string, lastJoiner?: string) =>
  array.length > 1
    ? `${array.slice(0, -1).join(joiner)}${lastJoiner}${array.at(-1)}`
    : array.toString();

const unique = <T>(array: T[]): T[] => Array.from(new Set(array));

export const array = { getIndices, joinWithLast, unique };
