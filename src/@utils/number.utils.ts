const roundBy = (value: number, increment: number): number =>
  Math.round(value * increment) / increment;

const sum = (...values: number[]): number =>
  values.reduce((result, value) => result + value, 0);

const average = (...values: number[]): number => sum(...values) / values.length;

const toFixed = (value: number, fractionDigits: number = 1): string => {
  const fixed = value.toFixed(fractionDigits);
  const asNumber = Number(fixed);
  return asNumber === Math.round(asNumber) ? value.toFixed(0) : fixed;
};

const percentage = (value: number, total?: number): string => {
  if (total !== undefined) return percentage(value / total);
  if (value <= 1 && value > 0) return percentage(value * 100);
  return `${toFixed(value)}%`;
};

export const number = { roundBy, average, sum, percentage, toFixed };
