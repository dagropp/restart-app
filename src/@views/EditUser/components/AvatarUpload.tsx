import Button from '@common/Button';
import Tooltip from '@common/Tooltip';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import UserAvatar from '@shared/UserAvatar';
import { useTranslations } from '@translations';
import { image } from '@utils/image.utils';
import { type ChangeEvent, useId, useState } from 'react';

import { InputName, PartnerInputName } from '../types';

interface Props {
  firstName: string;
  lastName: string;
  defaultValue?: string;
  Enum: typeof InputName | typeof PartnerInputName;
}

const AvatarUpload = ({
  firstName,
  lastName,
  defaultValue = '',
  Enum,
}: Props) => {
  const id = useId();
  const translations = useTranslations().settings.form;

  const [src, setSrc] = useState(defaultValue);
  const [resized, setResized] = useState(defaultValue);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.currentTarget.files ?? new FileList();
    if (file) {
      const dataUrl = await image.getDataURL(file);
      setSrc(dataUrl);
      const resizedUrl = await image.resize(dataUrl, 40);
      setResized(resizedUrl);
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <Button
        component="label"
        variant="outlined"
        endIcon={<CloudUploadRoundedIcon />}
        fullWidth
      >
        <input
          type="file"
          hidden
          id={id}
          accept="image/*"
          onChange={handleUpload}
        />
        {translations.uploadAvatar}
      </Button>
      <input type="hidden" name={Enum.Avatar} value={resized} />
      <Tooltip
        title={
          src && (
            <img
              src={src}
              alt="Avatar resize"
              className="h-[150px] w-[150px] object-cover"
            />
          )
        }
        placement="top"
      >
        <UserAvatar
          firstName={firstName}
          lastName={lastName}
          avatar={src}
          className="!w-14 !h-14"
        />
      </Tooltip>
    </div>
  );
};

export default AvatarUpload;
