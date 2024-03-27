import { useUsers } from "@app/providers/users";
import { useState } from "react";
import { Box, CSSObject } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { UserFilter, UserForTable } from "@app/models/user.model";

export const useTable = () => {
  const { applyFilters } = useUsers();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const textEllipsisStyle: CSSObject = {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const commonColumnProps = {
    disableColumnMenu: true,
    disableReorder: true,
    sortable: false,
    width: 150,
  };

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Correo Electrónico",
      ...commonColumnProps,
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }: GridRenderCellParams<UserForTable>) => (
        <Box sx={textEllipsisStyle}>{row.email}</Box>
      ),
    },
    {
      field: "firstName",
      headerName: "Nombres",
      ...commonColumnProps,
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }: GridRenderCellParams<UserForTable>) => (
        <Box sx={textEllipsisStyle}>{row.firstName}</Box>
      ),
    },
    {
      field: "lastName",
      headerName: "Apellidos",
      ...commonColumnProps,
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }: GridRenderCellParams<UserForTable>) => (
        <Box sx={textEllipsisStyle}>{row.lastName}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "email",
      text: "Correo electrónico",
    },
    {
      keyName: "firstName",
      text: "Nombres",
    },
    {
      keyName: "lastName",
      text: "Apellidos",
    },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = [],
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<UserFilter>>(
        (filters, field) => ({
          ...filters,
          [field.keyName]: field.value,
        }),
        {},
      ),
    );
  };

  return {
    columns,
    selectedUserIds,
    setSelectedUserIds,
    filters,
    applySearchBarFilters,
  };
};
