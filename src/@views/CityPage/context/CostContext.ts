import { createContext } from 'react';

import { ICostContext } from './types';

export const CostContext = createContext<ICostContext>({} as ICostContext);
