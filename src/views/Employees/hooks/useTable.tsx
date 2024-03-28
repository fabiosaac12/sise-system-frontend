import { EmployeeFilter, EmployeeForTable } from "@app/models/employee.model";
import { Box, CSSObject } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useEmployees } from "@app/providers/employees";
import { useState } from "react";

export const useTable = () => {
  const { catalogues, applyFilters } = useEmployees();

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

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
      field: "department.client.name",
      headerName: "Cliente",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.department.client.name}</Box>
      ),
    },
    {
      field: "department.name",
      headerName: "Departamento",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.department.name}</Box>
      ),
    },
    {
      field: "firstNames",
      headerName: "Nombres",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.firstNames}</Box>
      ),
    },
    {
      field: "lastNames",
      headerName: "Apellidos",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.lastNames}</Box>
      ),
    },
    {
      field: "idCard",
      headerName: "Cédula",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.idCard}</Box>
      ),
    },
    {
      field: "status",
      headerName: "Estatus",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.status}</Box>
      ),
    },
    {
      field: "workPosition",
      headerName: "Cargo",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.workPosition}</Box>
      ),
    },
    {
      field: "birthplace",
      headerName: "Lugar de nacimiento",
      ...commonColumnProps,
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.birthplace}</Box>
      ),
    },
    {
      field: "birthdate",
      headerName: "Fecha de nacimiento",
      ...commonColumnProps,
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>
          {new Date(row.birthdate).toLocaleDateString("es-VE")}
        </Box>
      ),
    },
    {
      field: "address",
      headerName: "Dirección",
      ...commonColumnProps,
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.address}</Box>
      ),
    },
    {
      field: "gender",
      headerName: "Género",
      ...commonColumnProps,
      width: 90,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.gender}</Box>
      ),
    },
    {
      field: "civilStatus",
      headerName: "Estado civil",
      ...commonColumnProps,
      width: 90,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.civilStatus}</Box>
      ),
    },
    {
      field: "dominantHand",
      headerName: "Mano dominante",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.dominantHand}</Box>
      ),
    },
    {
      field: "profession",
      headerName: "Profesión",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.profession}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "clientId",
      text: "Cliente",
      options: catalogues.clients,
      type: "select",
    },
    {
      keyName: "departmentId",
      text: "Departamento",
      options: catalogues.departments,
      type: "select",
    },
    { keyName: "idCard", text: "Cédula", type: "text" },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = [],
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<EmployeeFilter>>(
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
    filters,
    applySearchBarFilters,
    selectedEmployeeIds,
    setSelectedEmployeeIds,
  };
};
