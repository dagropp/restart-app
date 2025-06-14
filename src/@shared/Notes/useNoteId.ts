import { useParams } from 'react-router';

export const useNoteId = () => {
  const params = useParams();
  return Number(params.note);
};
