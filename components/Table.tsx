import React from 'react';
import { useTable, Column, useSortBy, UseSortByColumnProps, HeaderGroup } from 'react-table';
import {
  TableContainer,
  TableSortLabel,
  Table as MaUTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export function Table<T extends {}>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <Paper elevation={2} sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <MaUTable stickyHeader {...getTableProps()} sx={{ tableLayout: 'fixed' }}>
          <colgroup>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, c) => (
                <col
                  key={c}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                />
              )),
            )}
          </colgroup>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <TableRow {...headerGroupProps} key={key}>
                  {headerGroup.headers.map((_c) => {
                    const column = _c as HeaderGroup<T> & UseSortByColumnProps<T>;

                    const additionalSortProps = column.getSortByToggleProps();

                    const { key, ...props } = column.getHeaderProps(additionalSortProps);

                    return (
                      <TableCell {...props} key={key}>
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        >
                          {column.render('Header')}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              const { key, ...rowProps } = row.getRowProps();
              return (
                <TableRow {...rowProps} key={key}>
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();

                    return (
                      <TableCell {...cellProps} key={key}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
    </Paper>
  );
}
