import Link from '@common/Link';
import Typography from '@common/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import apiService, { InsightType } from '@services/api';
import InsightsIcon from '@shared/InsightsIcon';
import SectionCard from '@shared/SectionCard';
import { useQuery } from '@tanstack/react-query';
import { object } from '@utils/object.utils';

import { useCityContext } from '../../context';
import { itemTypeMap } from './constants';
import { ItemProps } from './types';

const Item = ({ insightKey, label, link }: ItemProps) => {
  return (
    <div className="flex gap-3 items-center">
      <InsightsIcon insightKey={insightKey} fontSize="small" />
      <Typography variant="body2" className="text-balance" lineHeight="normal">
        <span dangerouslySetInnerHTML={{ __html: label }} />{' '}
        {link && (
          <Link
            external
            href={link}
            color="inherit"
            className="align-text-top"
          />
        )}
      </Typography>
    </div>
  );
};

const InsightsSkeleton = () => {
  const groups = [
    itemTypeMap[InsightType.Good],
    itemTypeMap[InsightType.Neutral],
    itemTypeMap[InsightType.Bad],
  ];

  return groups.map(({ bgcolor, label, Icon }) => (
    <Box
      key={label}
      className="p-2 flex flex-col gap-2 rounded-lg"
      sx={{ bgcolor }}
    >
      <Typography className="flex gap-3" variant="subtitle2">
        <Icon fontSize="small" />
        {label}
      </Typography>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="70%" />
    </Box>
  ));
};

const Insights = () => {
  const { item } = useCityContext();

  const { data: insights = {}, isLoading } = useQuery({
    queryKey: ['getInsights', item.id],
    queryFn: () => apiService.insights.get(item.id),
  });

  return (
    <SectionCard theme="dark">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <InsightsSkeleton />
        ) : (
          object.entries(insights).map(([key, items]) => {
            const { bgcolor, Icon, label } = itemTypeMap[key];
            return (
              <Box
                className="p-2 flex flex-col gap-2 rounded-lg"
                key={key}
                sx={{ bgcolor }}
              >
                <Typography className="flex gap-3" variant="subtitle2">
                  <Icon fontSize="small" />
                  {label}
                </Typography>
                {items?.map(({ key, label, link }) => (
                  <Item key={key} insightKey={key} label={label} link={link} />
                ))}
              </Box>
            );
          })
        )}
      </div>
    </SectionCard>
  );
};

export default Insights;
