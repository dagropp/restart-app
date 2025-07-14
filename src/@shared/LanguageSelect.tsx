import Select, { SelectOption, type SelectProps } from '@common/Select';
import Typography from '@common/Typography';
import { Language, useTranslationsContext } from '@translations';
import { object } from '@utils/object.utils';

type Props = Omit<SelectProps<Language>, 'value' | 'options' | 'onChange'>;

interface TranslatedLanguageDisplayProps {
  name: string;
  id: Language;
}

const TranslatedLanguageDisplay = ({
  name,
  id,
}: TranslatedLanguageDisplayProps) => {
  return (
    <div className="flex gap-2 items-center justify-between w-full h-7">
      <Typography variant="body2">{name}</Typography>
      <img
        src={`/assets/language-flags/${id}.svg`}
        alt={name}
        className="h-4 ml-auto"
      />
    </div>
  );
};

const languages: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
};

const options: SelectOption<Language>[] = object
  .entries(languages)
  .map(([value, name]) => ({
    value,
    label: <TranslatedLanguageDisplay name={name} id={value} />,
  }));

const LanguageSelect = (props: Props) => {
  const { language, setLanguage } = useTranslationsContext();

  return (
    <Select
      options={options}
      value={language}
      onChange={setLanguage}
      {...props}
    />
  );
};

export default LanguageSelect;
