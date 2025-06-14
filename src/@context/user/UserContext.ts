import { createContext } from 'react';

import { type IUserContext } from './types';

export const UserContext = createContext<IUserContext>({} as IUserContext);
