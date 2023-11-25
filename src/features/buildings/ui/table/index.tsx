import React, { useCallback } from 'react';

import { BuildingMetaInfo } from '@/types';
import {
  createTableColumn,
  OnSelectionChangeData,
  TableCellLayout,
  TableColumnDefinition, TableRowId, useFluent, useScrollbarWidth,
} from '@fluentui/react-components';

import {
  DataGrid, DataGridBody, DataGridCell,
  DataGridHeader, DataGridHeaderCell, DataGridRow, RowRenderer,
} from '@fluentui-contrib/react-data-grid-react-window';

import classes from './styles.module.css';

interface TableProps {
  buildingsMeta: BuildingMetaInfo[];
  onBuildingSelect: (id: string) => void;
  buildingId: string;
}

const columns: TableColumnDefinition<BuildingMetaInfo>[] = [
  createTableColumn<BuildingMetaInfo>({
    columnId: 'geocoderAddress',
    compare: (a, b) => {
      return a.geocoderAddress.localeCompare(b.geocoderAddress);
    },
    renderHeaderCell: () => {
      return 'Address';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.geocoderAddress}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'technicalConditions',
    renderHeaderCell: () => {
      return 'Technical conditions';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.technicalConditions && item.technicalConditions}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'buildingSquare',
    compare: (a, b) => {
      return a.buildingSquare - b.buildingSquare;
    },
    renderHeaderCell: () => {
      return 'Building square';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.buildingSquare && `${item.buildingSquare} ㎡`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'buildingAge',
    compare: (a, b) => {
      return a.buildingAge - b.buildingAge;
    },
    renderHeaderCell: () => {
      return 'Building age';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.buildingAge && `${item.buildingAge} years`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'krValue',
    compare: (a, b) => {
      return a.krValue - b.krValue;
    },
    renderHeaderCell: () => {
      return 'Major renovation';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.krValue && `${item.krValue.toLocaleString('en')} ₽`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'ksValue',
    compare: (a, b) => {
      return a.ksValue - b.ksValue;
    },
    renderHeaderCell: () => {
      return 'Capital construction';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.ksValue && `${item.ksValue.toLocaleString('en')} ₽`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'trValue',
    compare: (a, b) => {
      return a.trValue - b.trValue;
    },
    renderHeaderCell: () => {
      return 'Current renovation';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.trValue && `${item.trValue.toLocaleString('en')} ₽`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'residualValue',
    compare: (a, b) => {
      return a.residualValue - b.residualValue;
    },
    renderHeaderCell: () => {
      return 'Residual';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.residualValue && `${item.residualValue} ₽`}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'balanceValue',
    compare: (a, b) => {
      return a.balanceValue - b.balanceValue;
    },
    renderHeaderCell: () => {
      return 'Balance';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.balanceValue && `${item.balanceValue} ₽`}
        </TableCellLayout>
      );
    },
  }),
];

const renderRow: RowRenderer<BuildingMetaInfo> = ({ item, rowId }, style) => (
  <DataGridRow<BuildingMetaInfo> key={rowId}
                                 style={style}>
    {({ renderCell }) => <DataGridCell>
      {renderCell(item)}
    </DataGridCell>}
  </DataGridRow>
);

const columnSizingOptions = {
  geocoderAddress: {
    minWidth: 250,
    defaultWidth: 250,
  },
  technicalConditions: {
    minWidth: 170,
    defaultWidth: 170,
  },

  balanceValue: {
    minWidth: 170,
    defaultWidth: 170,
  },
};

export const Table = ({ buildingsMeta, onBuildingSelect, buildingId }: TableProps) => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });
  const [selectedRows, setSelectedRows] = React.useState<TableRowId[]>(
    [buildingId],
  );

  const onSelectionChange = useCallback((_: unknown, data: OnSelectionChangeData) => {
    const selectedArray = [...data.selectedItems] as string[];
    setSelectedRows(selectedArray);
    onBuildingSelect(selectedArray[0]);
  }, [onBuildingSelect]);

  return <DataGrid
    className={classes.table}
    items={buildingsMeta}
    columns={columns}
    sortable
    getRowId={(item) => item.geocoderAddress}
    selectedItems={selectedRows}
    onSelectionChange={onSelectionChange}
    selectionMode='single'
    resizableColumns
    columnSizingOptions={columnSizingOptions}
  >
    <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
      <DataGridRow>
        {({ renderHeaderCell }) => (
          <DataGridHeaderCell className={classes.header}>
            {renderHeaderCell()}
          </DataGridHeaderCell>
        )}
      </DataGridRow>
    </DataGridHeader>

    <DataGridBody<BuildingMetaInfo> itemSize={100} height={400} >
      {renderRow}
    </DataGridBody>
  </DataGrid>;
};