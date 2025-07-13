import Link from '@common/Link';
import Typography from '@common/Typography';
import useIsOverflow from '@hooks/useIsOverflow';
import { NoteResponse } from '@services/api';
import { useTranslations } from '@translations';
import { string } from '@utils/string.utils';
import clsx from 'clsx';
import { useMemo } from 'react';

interface Props {
  note: NoteResponse;
  fullPage?: boolean;
}

export const TextNote = ({ note, fullPage }: Props) => {
  const { ref, isOverflow } = useIsOverflow<HTMLDivElement>('y');
  const translations = useTranslations().notes;

  const display = useMemo(
    () =>
      note.data?.split('\n').map((line, index) => (
        <Typography
          variant="body2"
          key={index}
          className="min-h-4"
          style={string.containsHebrew(line) ? { direction: 'rtl' } : undefined}
        >
          {line}
        </Typography>
      )),
    [note.data],
  );

  return (
    <div>
      <div className={clsx(!fullPage && 'line-clamp-10')} ref={ref}>
        {display}
      </div>
      {isOverflow && !fullPage && (
        <div className="pt-2">
          <Link href={String(note.parent ?? note.id)}>
            <Typography variant="body2">{translations.showMore}</Typography>
          </Link>
        </div>
      )}
    </div>
  );
};
