import React, { useCallback } from 'react';

import { BuildingMetaInfo } from '@/types';
import {
  createTableColumn,
  DataGrid, DataGridBody, DataGridCell,
  DataGridHeader, DataGridHeaderCell, DataGridRow, OnSelectionChangeData,
  TableCellLayout,
  TableColumnDefinition, TableRowId,
} from '@fluentui/react-components';

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
      return 'Technical Conditions';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.technicalConditions}
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
      return 'Square';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {`${item.buildingSquare} ㎡`}
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
      return 'Age';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.buildingAge}

          {' '}
          years
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<BuildingMetaInfo>({
    columnId: 'Prediction',
    compare: (a, b) => {
      return a.prediction - b.prediction;
    },
    renderHeaderCell: () => {
      return 'prediction';
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {`${item.prediction} ₽`}
        </TableCellLayout>
      );
    },
  }),
];

export const Table = ({ buildingsMeta, onBuildingSelect, buildingId }: TableProps) => {
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
  >
    <DataGridHeader>
      <DataGridRow>
        {({ renderHeaderCell }) => (
          <DataGridHeaderCell className={classes.header}>
            {renderHeaderCell()}
          </DataGridHeaderCell>
        )}
      </DataGridRow>
    </DataGridHeader>

    <DataGridBody<BuildingMetaInfo>>
      {({ item, rowId }) => (
        <DataGridRow<BuildingMetaInfo>
          key={rowId}
        >
          {({ renderCell }) => (
            <DataGridCell>
              {renderCell(item)}
            </DataGridCell>
          )}
        </DataGridRow>
      )}
    </DataGridBody>
  </DataGrid>;
};