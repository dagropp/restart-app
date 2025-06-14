import Link from '@common/Link';
import { TableCellRenderer } from '@common/Table';
import apiService, { ScrapingRecordsCommunity } from '@services/api';

export const CommunityLinkCell = ({
  row,
}: TableCellRenderer<ScrapingRecordsCommunity>) => {
  const { data: cities } = apiService.useCities();
  const city = cities?.[row.city];

  if (!city?.communityKey) return null;

  return (
    <Link
      external
      href={`https://www.facebook.com/groups/${city.communityKey}`}
      stopPropagation
    >
      Facebook
    </Link>
  );
};
