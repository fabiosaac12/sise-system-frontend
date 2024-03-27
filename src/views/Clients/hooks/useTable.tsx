import { ClientFilter, ClientForTable } from "@app/models/client.model";
import { Box, Button, CSSObject, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useClients } from "@app/providers/clients";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export const useTable = () => {
  const { applyFilters } = useClients();

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
    width: 150,
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Cliente",
      ...commonColumnProps,
      flex: 1,
      minWidth: 100,
      renderCell: ({ row }: GridRenderCellParams<ClientForTable>) => (
        <Box sx={textEllipsisStyle}>{row.name}</Box>
      ),
    },
    {
      field: "departments",
      headerName: "Departamento",
      ...commonColumnProps,
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }: GridRenderCellParams<ClientForTable>) => (
        <Box sx={textEllipsisStyle}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/departments?clientid=${row.id}`}
          >
            <Button
              variant="text"
              sx={{ display: "flex", gap: 1 }}
              onClick={() => console.log(row.id)}
            >
              <Typography color="secondary">Ver Departamentos</Typography>{" "}
              <VisibilityIcon color="secondary" />
            </Button>
          </Link>
        </Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "name",
      text: "Nombre",
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