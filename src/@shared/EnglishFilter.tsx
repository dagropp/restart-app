import Select, { SelectOption } from '@common/Select';
import { useTranslations } from '@translations';

interface Props {
  filter: number;
  onChange: (value: number) => void;
}

const EnglishFilter = ({ filter, onChange }: Props) => {
  const translations = useTranslations().table.filters;

  const options: SelectOption<number>[] = [
    { value: 0, label: '0%' },
    { value: 10, label: '10%' },
    { value: 20, label: '20%' },
    { value: 30, label: '30%' },
    { value: 40, label: '40%' },
    { value: 50, label: '50%' },
    { value: 60, label: '60%' },
    { value: 70, label: '70%' },
    { value: 80, label: '80%' },
    { value: 90, label: '90%' },
    { value: 100, label: translations.englishNative },
  ];

  return (
    <Select
      options={options}
      value={filter}
      onChange={onChange}
      label={translations.minEnglishSpeakers}
      placeholder={translations.minEnglishSpeakers}
    />
  );
};

export default EnglishFilter;
