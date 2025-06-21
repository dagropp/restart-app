import Typography from '@common/Typography';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { type PropsWithChildren, type ReactNode } from 'react';

import SectionCard from './SectionCard';

export interface GeneralItemProps {
  label: string;
  display: ReactNode;
  Icon?: OverridableComponent<SvgIconTypeMap>;
  hidden?: boolean;
}

interface Props {
  items: GeneralItemProps[];
}

export const GeneralDataItem = ({ label, display, Icon }: GeneralItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <Typography variant="body2" className="flex items-center gap-2">
        {Icon && <Icon fontSize="small" />}
        <strong>{label}</strong>
      </Typography>
      {display}
    </div>
  );
};

const GeneralDataCard = ({ children, items }: PropsWithChildren<Props>) => (
  <SectionCard>
    {children}
    <div className="flex flex-col gap-4">
      {items
        .filter((item) => !item.hidden)
        .map((item) => (
          <GeneralDataItem
            key={item.label}
            label={item.label}
            display={item.display}
            Icon={item.Icon}
          />
        ))}
    </div>
  </SectionCard>
);

export default GeneralDataCard;
