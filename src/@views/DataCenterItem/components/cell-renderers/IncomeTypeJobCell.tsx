import { TableCellRenderer } from '@common/Table';
import Typography from '@common/Typography';
import { ScrapingRecordsIncomeLevels } from '@services/api';
import { useTranslations } from '@translations';
import { incomeUtils } from '@utils/income.utils';

export const IncomeTypeJobCell = ({
  row,
}: TableCellRenderer<ScrapingRecordsIncomeLevels>) => {
  const translations = useTranslations();

  if (!row.type) return null;

  const { title, subtitle } = incomeUtils.getTypeData(row.type, translations);

  return (
    <div className="flex flex-col">
      <Typography variant="body2">{title}</Typography>
      {subtitle && <Typography variant="caption">{subtitle}</Typography>}
    </div>
  );
};
