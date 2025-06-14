import { useReducer } from 'react';

const useObjectState = <T extends object>(defaultValue: T) =>
  useReducer(
    (state: T, update: Partial<T>) => ({
      ...state,
      ...update,
    }),
    defaultValue,
  );

export default useObjectState;
