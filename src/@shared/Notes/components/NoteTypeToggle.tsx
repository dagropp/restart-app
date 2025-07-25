import Tooltip from '@common/Tooltip';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import IconButton from '@mui/material/IconButton';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { NoteType } from '@root/types';
import { NoteData } from '@shared/Notes/components/NoteForm';
import { useTranslations } from '@translations';
import { useFormContext } from 'react-hook-form';

interface NoteTypeOptions {
  type: NoteType;
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  disabled?: boolean;
}

export const NoteTypeToggle = () => {
  const { setValue, watch, resetField } = useFormContext<NoteData>();
  const selected = watch('type');
  const translations = useTranslations().notes;

  const handleClick = (type: NoteType) => () => {
    setValue('type', type);
    resetField('note');
  };

  const types: NoteTypeOptions[] = [
    {
      type: NoteType.Note,
      Icon: TextSnippetRoundedIcon,
      label: translations.textNote,
    },
    {
      type: NoteType.Link,
      Icon: LinkRoundedIcon,
      label: translations.link,
    },
  ];

  return types.map(({ type, label, Icon, disabled }) => (
    <Tooltip key={label} title={label}>
      <IconButton
        color={type === selected ? 'primary' : 'default'}
        onClick={handleClick(type)}
        disabled={disabled}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  ));
};
