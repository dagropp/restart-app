import Compare from '@shared/Compare';

import { useCityContext } from '../context';

interface Props {
  loading: boolean;
}

const CityCompare = ({ loading }: Props) => {
  const { item } = useCityContext();

  return (
    <Compare
      storageKey="compareCity"
      defaultCity={item?.id}
      loading={loading}
      readOnly
    />
  );
};

export default CityCompare;
