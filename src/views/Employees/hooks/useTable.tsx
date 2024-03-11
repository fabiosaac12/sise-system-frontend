import { EmployeeFilter, EmployeeForTable } from "@app/models/employee.model";
import { Box, CSSObject, useMediaQuery, useTheme } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useEmployees } from "@app/providers/employees";
import { useState } from "react";

export const useTable = () => {
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const { catalogues, applyFilters } = useEmployees();

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const textEllipsisStyle: CSSObject = {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const columns: GridColDef[] = [
    {
      field: "department.client.name",
      headerName: "Cliente",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.department.client.name}</Box>
      ),
    },
    {
      field: "department.name",
      headerName: "Departamento",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.department.name}</Box>
      ),
    },
    {
      field: "firstNames",
      headerName: "Nombres",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.firstNames}</Box>
      ),
    },
    {
      field: "lastNames",
      headerName: "Apellidos",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.lastNames}</Box>
      ),
    },
    {
      field: "idCard",
      headerName: "Cédula",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.idCard}</Box>
      ),
    },
    {
      field: "status",
      headerName: "Estatus",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.status}</Box>
      ),
    },
    {
      field: "workPosition",
      headerName: "Cargo",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.workPosition}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "clientId",
      text: "Cliente",
      options: catalogues.clients,
    },
    {
      keyName: "departmentId",
      text: "Departamento",
      options: catalogues.departments,
    },
    { keyName: "idCard", text: "Cédula" },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = []
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<EmployeeFilter>>(
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
    selectedEmployeeIds,
    setSelectedEmployeeIds,
  };
};
