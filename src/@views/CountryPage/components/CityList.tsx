import Rating from '@common/Rating';
import Table, { TableCellRenderer, TableColumn } from '@common/Table';
import Typography from '@common/Typography';
import apiService, { CityData } from '@services/api';
import { BookmarkCell } from '@shared/BookmarkCell';
import SectionCard from '@shared/SectionCard';
import { number } from '@utils/number.utils';
import { useNavigate } from 'react-router';

import { useCountryContext } from '../context';

const ScoreCell = ({ row }: TableCellRenderer<CityData>) => {
  const { data: scores } = apiService.score.use();
  const { average } = scores[row.id];

  return (
    <div className="text-right">
      <Rating
        value={average}
        base={10}
        readOnly
        tooltip={number.toFixed(average / 2)}
      />
    </div>
  );
};

const bookmarkCell = {
  key: 'bookmark',
  cellRenderer: ({ row }: TableCellRenderer<CityData>) => (
    <BookmarkCell row={row} isAlwaysVisible />
  ),
};
const nameCell = { key: 'name' };
const stateCell = { key: 'state' };
const scoreCell = { key: 'score', cellRenderer: ScoreCell };

export const CityList = () => {
  const { cities } = useCountryContext();
  const navigate = useNavigate();

  const columns: TableColumn<CityData>[] = cities.some((item) => item.state)
    ? [bookmarkCell, nameCell, stateCell, scoreCell]
    : [bookmarkCell, nameCell, scoreCell];

  const handleRowClick = (row: CityData) => navigate(`/city/${row.id}`);

  return (
    <SectionCard title="Cities">
      {cities.length ? (
        <Table
          rows={cities}
          columns={columns}
          rowKey="id"
          headerHidden
          defaultSort={{ key: 'country', direction: 'asc' }}
          onRowClick={handleRowClick}
        />
      ) : (
        <Typography variant="body2" className="text-center">
          No featured cities
        </Typography>
      )}
    </SectionCard>
  );
};
