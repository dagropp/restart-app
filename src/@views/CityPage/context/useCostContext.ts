import { useContext } from 'react';

import { CostContext } from './CostContext';

export const useCostContext = () => useContext(CostContext);
