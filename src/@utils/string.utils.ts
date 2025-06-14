const isEmpty = (value?: string): boolean =>
  !value || value.trim().length === 0;

const containsHebrew = (value?: string): boolean =>
  !isEmpty(value) && !!value && /[\u0590-\u05FF]/.test(value);

export const string = { isEmpty, containsHebrew };
