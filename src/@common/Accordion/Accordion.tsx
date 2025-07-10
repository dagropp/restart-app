import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslationsContext } from '@translations';
import clsx from 'clsx';

import Typography from '../Typography';
import classes from './styles.module.css';
import { AccordionProps } from './types';

const Accordion = ({
  expanded,
  handleExpand,
  title,
  Icon,
  children,
}: AccordionProps) => {
  const { isRtl } = useTranslationsContext();

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={handleExpand}
      variant="outlined"
      disableGutters
      className={clsx(classes.accordion, '!bg-transparent !text-inherit')}
    >
      <AccordionSummary
        title={title}
        expandIcon={<ExpandMoreIcon />}
        className="!p-0"
        classes={{ content: '!m-0' }}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon fontSize="small" />}
          <Typography variant="subtitle2" dir={isRtl ? 'rtl' : 'ltr'}>
            {title}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="!p-0">
        <div className="flex flex-col gap-4 pb-2">{children}</div>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
