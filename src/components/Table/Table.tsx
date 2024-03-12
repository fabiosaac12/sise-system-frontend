import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridDensity,
  GridRenderCellParams,
  GridColumnGroupingModel,
  GridRowId,
  GridPaginationModel,
  DataGridProps,
} from "@mui/x-data-grid";
import { DeleteOutline, Settings, Visibility } from "@mui/icons-material";
import { TableActions, TableAction } from "./TableActions";

interface Props extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  rowCount?: number;
  multiselect?: boolean;
  density?: GridDensity;
  customActions?: TableAction[];
  loading?: boolean;
  columnGroupingModel?: GridColumnGroupingModel;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGetDetails?: (id: string) => void;
  onDeleteMany?: (ids: string[]) => void;
  onSearch?: (query: string) => void;
  onRowSelectionChange?: (selectedIds: GridRowId[]) => void;
  onPaginationChange?: (pagination: GridPaginationModel) => void;
  variant?: "primary" | "secondary";
  title?: string;
  noDataMessage?: string;
}

export const Table: FC<Props> = ({
  columns,
  rows,
  rowCount,
  onEdit,
  onDelete,
  onGetDetails,
  customActions,
  multiselect,
  loading,
  columnGroupingModel,
  onRowSelectionChange,
  onPaginationChange,
  noDataMessage,
  ...props
}) => {
  const actions: TableAction[] = [
    ...(onGetDetails
      ? [
          {
            tooltip: "Ver detalles",
            icon: <Visibility sx={{ "&:hover": { color: "primary.main" } }} />,
            onClick: onGetDetails,
          },
        ]
      : []),
    ...(onEdit
      ? [
          {
            tooltip: "Editar",
            icon: <Settings sx={{ "&:hover": { color: "primary.main" } }} />,
            onClick: onEdit,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            tooltip: "Eliminar",
            icon: (
              <DeleteOutline sx={{ "&:hover": { color: "primary.main" } }} />
            ),
            onClick: onDelete,
          },
        ]
      : []),
    ...(customActions ? customActions : []),
  ];

  const colums: GridColDef[] = [
    ...columns,
    ...(actions.length > 0
      ? [
          {
            field: "id",
            headerName: "Acciones",
            width: actions.length >= 3 ? actions.length * 48 : 96,
            sortable: false,
            renderCell: ({ row }: GridRenderCellParams) => {
              return <TableActions rowId={row._id} actions={actions} />;
            },
          },
        ]
      : []),
  ];

  return (
    <Grid item xs={12} sx={{ width: "100%" }}>
      {rows.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Typography>
            {noDataMessage ? noDataMessage : "No hay datos para mostrar"}
          </Typography>
        </Box>
      ) : (
        <DataGrid
          {...props}
          rows={rows}
          columns={colums}
          getRowId={(row) => row.id}
          disableColumnFilter
          disableRowSelectionOnClick
          pageSizeOptions={[2, 5, 10, 15, 20, 25]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          loading={loading}
          columnHeaderHeight={60}
          rowHeight={56}
          checkboxSelection={multiselect}
          onRowSelectionModelChange={
            onRowSelectionChange
              ? (newRowSelectionModel) => {
                  onRowSelectionChange(newRowSelectionModel);
                }
              : undefined
          }
          experimentalFeatures={
            columnGroupingModel ? { columnGrouping: true } : undefined
          }
          columnGroupingModel={columnGroupingModel}
          onPaginationModelChange={onPaginationChange}
          localeText={{
            footerRowSelected: (count) =>
              `${count} ${
                count > 1 ? "elementos seleccionados" : "elemento seleccionado"
              }`,
            MuiTablePagination: {
              labelRowsPerPage: "Filas por página",
              labelDisplayedRows(paginationInfo) {
                const { from, to, count } = paginationInfo;

                return `${from}-${to} de ${count}`;
              },
            },
          }}
          rowCount={rowCount}
        />
      )}
    </Grid>
  );
};
