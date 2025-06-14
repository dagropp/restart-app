import { createContext } from 'react';

import { ICityContext } from './types';

export const CityContext = createContext<ICityContext>({} as ICityContext);
