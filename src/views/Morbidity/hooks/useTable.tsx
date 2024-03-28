import { Box, CSSObject } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useState } from "react";
import { useMorbidity } from "@app/providers/morbidity";
import {
  MorbidityFilter,
  MorbidityForTable,
} from "@app/models/morbidity.model";

export const useTable = () => {
  const { catalogues, applyFilters } = useMorbidity();

  const [selectedMorbidityIds, setSelectedMorbidityIds] = useState<string[]>(
    [],
  );

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
      field: "date",
      headerName: "FECHA",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>
          {new Date(row.dateTime).toLocaleDateString("es-VE")}
        </Box>
      ),
    },
    {
      field: "hour",
      headerName: "HORA",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{`${new Date(
          row.dateTime,
        ).getHours()}:${new Date(row.dateTime).getMinutes()}`}</Box>
      ),
    },
    {
      field: "fullName",
      headerName: "NOMBRE Y APELLIDO",
      ...commonColumnProps,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box
          sx={textEllipsisStyle}
        >{`${row.employee.firstNames} ${row.employee.lastNames}`}</Box>
      ),
    },
    {
      field: "employee.idCard",
      headerName: "CÉDULA",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{row.employee.idCard}</Box>
      ),
    },
    {
      field: "age",
      headerName: "EDAD",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row: _row }: GridRenderCellParams<MorbidityForTable>) => {
        const row = new Date(_row.employee.birthdate);
        const actual = new Date();
        const aux = new Date(
          actual.getFullYear(),
          row.getMonth(),
          row.getDate(),
        );
        let result = actual.getFullYear() - row.getFullYear();
        result -=
          actual < aux && actual.getFullYear() !== row.getFullYear() ? 1 : 0;
        return <Box sx={textEllipsisStyle}>{result}</Box>;
      },
    },
    {
      field: "employee.workPosition",
      headerName: "CARGO",
      ...commonColumnProps,
      width: 110,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{row.employee.workPosition}</Box>
      ),
    },
    {
      field: "diagnostic",
      headerName: "DIAGNOSTICO",
      ...commonColumnProps,
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{row.diagnosis}</Box>
      ),
    },

    {
      field: "treatment",
      headerName: "TRATAMIENTO",
      ...commonColumnProps,
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{row.treatment ?? "Sin tratamiento"}</Box>
      ),
    },
    {
      field: "quantity",
      headerName: "CANTIDAD",
      ...commonColumnProps,
      width: 90,
      renderCell: ({ row }: GridRenderCellParams<MorbidityForTable>) => (
        <Box sx={textEllipsisStyle}>{row.quantity ?? 0}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "date",
      text: "Fecha",
      type: "date",
    },
    {
      keyName: "clientId",
      text: "Cliente",
      options: catalogues.clients,
      type: "select",
    },
    { keyName: "workPosition", text: "Cargo", type: "text" },
  ];

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = [],
  ) => {
    applyFilters(
      appliedFilters.reduce<Partial<MorbidityFilter>>(
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
    selectedMorbidityIds,
    setSelectedMorbidityIds,
  };
};
