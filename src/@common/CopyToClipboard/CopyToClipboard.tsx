import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import IconButton from '@mui/material/IconButton';
import { type MouseEvent, useState } from 'react';

import { CopyToClipboardProps } from './types';

const CopyToClipboard = ({ children, value }: CopyToClipboardProps) => {
  const [didCopy, setDidCopy] = useState(false);

  const copy = async (event: MouseEvent) => {
    event.stopPropagation();
    setDidCopy(true);
    await navigator.clipboard.writeText(value);
    setTimeout(() => setDidCopy(false), 500);
  };

  const Icon = didCopy ? CheckRoundedIcon : ContentCopyRoundedIcon;

  return (
    <span className="flex items-center gap-1">
      {children}
      <IconButton
        size="small"
        className="relative"
        onClick={copy}
        disabled={didCopy}
      >
        <Icon fontSize="small" />
      </IconButton>
    </span>
  );
};

export default CopyToClipboard;
