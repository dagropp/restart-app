import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { CompareData, CompareStatus } from '@services/api';
import { useMemo } from 'react';

import InsightsIcon from '../../InsightsIcon';
import { Item } from './Item';

interface Props {
  data: CompareData[];
}

export const List = ({ data }: Props) => {
  const result = useMemo(() => {
    const cityTotal = data
      .map((item) => item.city.status)
      .filter((status) => status !== CompareStatus.Loser).length;
    const otherTotal = data
      .map((item) => item.other.status)
      .filter((status) => status !== CompareStatus.Loser).length;
    const cityStatus =
      cityTotal > otherTotal
        ? CompareStatus.Winner
        : cityTotal < otherTotal
          ? CompareStatus.Loser
          : CompareStatus.Tie;
    const otherStatus = cityStatus * -1;
    return {
      city: { total: cityTotal, status: cityStatus },
      other: { total: otherTotal, status: otherStatus },
    };
  }, [data]);

  return (
    <>
      {data.map((item, index) => (
        <div
          className="flex col-span-3 gap-3 sm:contents sm:col-span-[initial] sm:gap-0"
          key={item.key}
        >
          <Item
            rtl={true}
            label={item.city.label}
            status={item.city.status}
            isFirst={index === 0}
            isLast={index === data.length - 1}
          />
          <div className="hidden items-center sm:flex">
            <InsightsIcon
              insightKey={item.key}
              fontSize="small"
              color="action"
            />
          </div>
          <Item
            rtl={false}
            label={item.other.label}
            status={item.other.status}
            isFirst={index === 0}
            isLast={index === data.length - 1}
          />
        </div>
      ))}
      <Item
        rtl={true}
        label={`Total ${result.city.total}/${data.length}`}
        status={result.city.status}
        isIsolated
      />
      <div className="flex items-center mt-5">
        <EmojiEventsRoundedIcon color="action" />
      </div>
      <Item
        rtl={false}
        label={`Total ${result.other.total}/${data.length}`}
        status={result.other.status}
        isIsolated
      />
    </>
  );
};
