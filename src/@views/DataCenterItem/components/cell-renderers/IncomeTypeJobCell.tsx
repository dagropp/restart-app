import { TableCellRenderer } from '@common/Table';
import Typography from '@common/Typography';
import { ScrapingRecordsIncomeLevels } from '@services/api';
import { incomeUtils } from '@utils/income.utils.ts';

export const IncomeTypeJobCell = ({
  row,
}: TableCellRenderer<ScrapingRecordsIncomeLevels>) => {
  if (!row.type) return null;

  const { title, subtitle } = incomeUtils.typeMap[row.type];

  return (
    <div className="flex flex-col">
      <Typography variant="body2">{title}</Typography>
      {subtitle && <Typography variant="caption">{subtitle}</Typography>}
    </div>
  );
};
