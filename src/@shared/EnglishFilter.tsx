import Select, { SelectOption } from '@common/Select';

interface Props {
  filter: number;
  onChange: (value: number) => void;
}

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
  { value: 100, label: 'Native Language' },
];

const EnglishFilter = ({ filter, onChange }: Props) => (
  <Select
    options={options}
    value={filter}
    onChange={onChange}
    label="Min English Speakers"
    placeholder="Min English Speakers"
  />
);

export default EnglishFilter;
