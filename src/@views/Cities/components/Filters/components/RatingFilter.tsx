import Rating from '@common/Rating';
import Select, { SelectOption } from '@common/Select';
import { useFiltersContext } from '@context/filters';
import { useTranslations } from '@translations';

import { CitiesFilters } from '../../../types';

const options: SelectOption<number>[] = [
  { value: 5, label: <Rating value={5} readOnly /> },
  { value: 4.5, label: <Rating value={4.5} readOnly /> },
  { value: 4, label: <Rating value={4} readOnly /> },
  { value: 3.5, label: <Rating value={3.5} readOnly /> },
  { value: 3, label: <Rating value={3} readOnly /> },
  { value: 2.5, label: <Rating value={2.5} readOnly /> },
  { value: 2, label: <Rating value={2} readOnly /> },
  { value: 1.5, label: <Rating value={1.5} readOnly /> },
  { value: 1, label: <Rating value={1} readOnly /> },
  { value: 0.5, label: <Rating value={0.5} readOnly /> },
  { value: 0, label: <Rating value={0} readOnly /> },
];

export const RatingFilter = () => {
  const { filters, updateFilters } = useFiltersContext<CitiesFilters>();
  const translations = useTranslations().table.filters;

  return (
    <Select
      options={options}
      value={filters.minRating}
      onChange={(minRating) => updateFilters({ minRating })}
      label={translations.minRating}
      placeholder={translations.minRating}
      renderValue={(item) => (
        <div className="flex gap-2 items-center flex-wrap">
          <Rating value={item} readOnly />
        </div>
      )}
    />
  );
};
