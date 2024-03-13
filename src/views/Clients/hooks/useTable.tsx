import { ClientFilter, ClientForTable } from "@app/models/client.model";
import { Box, CSSObject } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useClients } from "@app/providers/clients";
import { useState } from "react";

export const useTable = () => {
  const { catalogues, applyFilters } = useClients();

  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

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
    width: 130,
  };

  const columns: GridColDef[] = [
    {
      field: "client",
      headerName: "Cliente",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<ClientForTable>) => (
        <Box sx={textEllipsisStyle}>{row.name}</Box>
      ),
    },
    {
      field: "departments",
      headerName: "Departamento",
      ...commonColumnProps,
      renderCell: () => <Box sx={textEllipsisStyle}>{`Ver Departamentos`}</Box>,
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "clientId",
      text: "Cliente",
      options: catalogues.clients,
    },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = []
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<ClientFilter>>(
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
    selectedClientIds,
    setSelectedClientIds,
    filters,
    applySearchBarFilters,
  };
};
