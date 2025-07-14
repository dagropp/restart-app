import apiService from '@services/api';
import { useQuery } from '@tanstack/react-query';

import { ChecklistSkeleton, ChecklistWithData } from './components';

const Checklist = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getChecklist'],
    queryFn: () => apiService.checklist.get(),
  });

  return isLoading || !data ? (
    <ChecklistSkeleton />
  ) : (
    <ChecklistWithData data={data} refetch={refetch} />
  );
};

export default Checklist;
