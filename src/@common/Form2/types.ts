export interface FormField<T extends object> {
  key: keyof T;
  defaultValue?: T[keyof T];
  fromString?: (value: string) => T[keyof T];
}

export interface FormProps<T extends object> {
  fields: FormField<T>[];
}
