import {
  DepartmentFilter,
  DepartmentForTable,
} from '@app/models/department.model';
import { Box, CSSObject } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from '@app/models/components';

import { useState } from 'react';
import { useDeparments } from '@app/providers/deparments';

export const useTable = () => {
  const { catalogues, applyFilters } = useDeparments();

  const [selectedDeparmentsIds, setSelectedDeparmentsIds] = useState<string[]>(
    []
  );

  const textEllipsisStyle: CSSObject = {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const commonColumnProps = {
    disableColumnMenu: true,
    disableReorder: true,
    sortable: false,
    width: 130,
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Departamento',
      ...commonColumnProps,
      flex: 1,
      minWidth: 130,
      renderCell: ({ row }: GridRenderCellParams<DepartmentForTable>) => (
        <Box sx={textEllipsisStyle}>{row.name}</Box>
      ),
    },
    {
      field: '_count.employees',
      headerName: 'Cantidad de Empleados',
      ...commonColumnProps,
      flex: 1,
      minWidth: 190,
      renderCell: ({ row }: GridRenderCellParams<DepartmentForTable>) => (
        <Box sx={textEllipsisStyle}>{row._count.employees}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: 'clientId',
      text: 'Cliente',
      options: catalogues.clients,
    },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = []
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<DepartmentFilter>>(
        (filters, field) => ({
          ...filters,
          [field.keyName]: field.value,
        }),
        {}
      )
    );
  };

  return {
    columns,
    filters,
    applySearchBarFilters,
    selectedDeparmentsIds,
    setSelectedDeparmentsIds,
  };
};
