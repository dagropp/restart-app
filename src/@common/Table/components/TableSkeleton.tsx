import { Skeleton } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';

import CloneElement from '../../CloneElement';

interface Props {
  columnsCount: number;
}

export const TableSkeleton = ({ columnsCount }: Props) => (
  <CloneElement times={8}>
    <MuiTableRow>
      <CloneElement times={columnsCount}>
        <MuiTableCell>
          <Skeleton />
        </MuiTableCell>
      </CloneElement>
    </MuiTableRow>
  </CloneElement>
);
