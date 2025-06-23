import { TableCellRenderer } from '@common/Table';
import Typography from '@common/Typography';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { ScrapingData } from '@services/api';
import { DataFreshness } from '@views/DataCenter/types';
import { getDataFreshness } from '@views/DataCenter/utils';
import { useMemo } from 'react';

const freshnessLabel: Record<DataFreshness, string> = {
  [DataFreshness.Empty]: 'Empty',
  [DataFreshness.Outdated]: 'Outdated',
  [DataFreshness.Standard]: 'Standard',
  [DataFreshness.Fresh]: 'Fresh',
};

const getFreshnessColor = (freshness: DataFreshness, theme: Theme) => {
  switch (freshness) {
    case DataFreshness.Empty:
      return theme.palette.text.disabled;
    case DataFreshness.Outdated:
      return theme.palette.error.light;
    case DataFreshness.Standard:
      return theme.palette.warning.light;
    case DataFreshness.Fresh:
      return theme.palette.success.light;
  }
};

export const FreshnessCell = ({
  row: { records, lastUpdate },
}: TableCellRenderer<ScrapingData>) => {
  const labelData = useMemo(() => {
    const freshness = getDataFreshness(records, lastUpdate);
    return {
      label: freshnessLabel[freshness],
      sx: (theme: Theme) => ({
        color: theme.palette.primary.contrastText,
        bgcolor: getFreshnessColor(freshness, theme),
      }),
    };
  }, [lastUpdate, records]);

  return (
    <Box sx={labelData.sx} className="w-max px-1 rounded">
      <Typography variant="caption">{labelData.label}</Typography>
    </Box>
  );
};
