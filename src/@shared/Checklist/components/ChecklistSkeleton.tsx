import CloneElement from '@common/CloneElement';
import TextField from '@common/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from '@translations';

import { ChecklistSkeletonItem } from './ChecklistSkeletonItem';

export const ChecklistSkeleton = () => {
  const translations = useTranslations().notes;
  const theme = useTheme();

  return (
    <div className="max-w-[600px] mx-auto flex items-start pt-2">
      <div className="flex-1">
        <div className="flex gap-2 items-center pb-4">
          <TextField
            variant="standard"
            autoFocus
            fullWidth
            placeholder={translations.add.todoItem}
            disabled
          />
          <IconButton size="small" disabled>
            <AddRoundedIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="border-b pb-5"
            style={{ borderColor: theme.palette.divider }}
          >
            <CloneElement times={5}>
              <ChecklistSkeletonItem isDone={false} />
            </CloneElement>
          </div>
          <div>
            <CloneElement times={5}>
              <ChecklistSkeletonItem isDone={true} />
            </CloneElement>
          </div>
        </div>
      </div>
      <IconButton size="small" disabled>
        <MoreVertIcon />
      </IconButton>
    </div>
  );
};
