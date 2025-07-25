import { useContext } from 'react';

import { UserContext } from './UserContext';

export const useUserContext = () => useContext(UserContext);
