import React from 'react';
import { Cell, CellProps } from 'fixed-data-table-2';

function TextCellBase<T>({ data, ...props }: CellProps & { data: T[] }) {
  // @ts-ignore
  const dataToCell = data?.[props.rowIndex!]?.[props.columnKey!];

  return dataToCell ? <Cell {...props}>{dataToCell}</Cell> : null;
}

export const TextCell = React.memo(TextCellBase);
