const getIndices = <T>(array: T[], indices: number[]) =>
  indices.map((index) => array[index]);

export const array = { getIndices };
