import { Link } from '@mui/material';
import { Cell, CellProps } from 'fixed-data-table-2';

import { SortTypes } from '../interfaces';

function reverseSortDirection(sortDir: SortTypes): SortTypes {
  return sortDir === 'DESC' ? 'ASC' : 'DESC';
}

interface SortHeaderCellProps {
  onSortChange(c: string, t: SortTypes): void;
  sortDir?: SortTypes;
}

export const SortHeaderCell: React.FC<SortHeaderCellProps & CellProps> = ({
  onSortChange,
  sortDir,
  children,

  ...props
}) => {
  const _onSortChange = () => {
    if (onSortChange) {
      onSortChange(String(props.columnKey!), sortDir ? reverseSortDirection(sortDir) : 'DESC');
    }
  };

  return (
    <Cell {...props}>
      <Link
        underline="none"
        onClick={(e) => {
          e.preventDefault();
          _onSortChange();
        }}
      >
        {children} {sortDir ? (sortDir === 'DESC' ? '↓' : '↑') : ''}
      </Link>
    </Cell>
  );
};
