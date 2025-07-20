import Tooltip from '@common/Tooltip';
import useMapState from '@hooks/useMapState';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import IconButton from '@mui/material/IconButton';
import { ChildrenPayload } from '@services/api';
import { useTranslations } from '@translations';
import { useEffect, useRef } from 'react';

import { NewChildInput } from './ChildInput';

const emptyChild: ChildrenPayload = { name: '', dateOfBirth: null };

interface Props {
  hasChildren: boolean;
}

export const CreateChildrenList = ({ hasChildren }: Props) => {
  const { state, update, remove, add, reset } = useMapState<
    string,
    ChildrenPayload
  >(hasChildren ? undefined : { [crypto.randomUUID()]: emptyChild });
  const ref = useRef<HTMLButtonElement>(null);
  const translations = useTranslations().settings.form;

  useEffect(() => {
    const form = ref.current?.form;
    if (form) {
      form.addEventListener('reset', reset);
      return () => form.removeEventListener('reset', reset);
    }
  }, [reset]);

  return (
    <>
      {Array.from(state.entries()).map(([key, item]) => (
        <NewChildInput
          key={key}
          defaultValue={item}
          onChange={(value) => update(key, value)}
          onDelete={() => remove(key)}
        />
      ))}

      <Tooltip title={translations.addChild} placement="right">
        <IconButton
          onClick={() => add(crypto.randomUUID(), emptyChild)}
          className="w-max"
          ref={ref}
        >
          <PersonAddRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};
