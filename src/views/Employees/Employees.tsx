import { SearchBar } from "@app/components/SearchBar";
import { Table } from "@app/components/Table";
import {
  EmployeeForTable,
  EmployeeStatusEnum,
} from "@app/models/employee.model";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useEmployees } from "@app/providers/employees";
import { useTable } from "./hooks/useTable";

const items: EmployeeForTable[] = [
  {
    id: "some",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som2",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som3",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som5",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som4",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som7",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
  {
    id: "som0",
    clientName: "SUNSOl",
    departmentName: "SUNSOL empleados",
    firstNames: "Fabio Isaac",
    lastNames: "Bermudez Molina",
    idCard: 29655801,
    status: EmployeeStatusEnum.hired,
    workPosition: "Developer",
  },
];

export const Employees = () => {
  const theme = useTheme();
  const { applyFilters, catalogues, filter } = useEmployees();

  const {
    columns,
    filters: searchBy,
    openCreateModal,
    openDeleteModal,
    openEditModal,
    applySearchBarFilters,
  } = useTable();

  useEffect(() => {
    catalogues.getClients();
  }, []);

  useEffect(() => {
    catalogues.getDepartments(filter.clientId);
  }, [filter.clientId]);

  return (
    <Container
      sx={{
        py: theme.spacing(4),
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      maxWidth="xl"
    >
      <Card
        sx={{
          padding: theme.spacing(4),
          minHeight: "100%",
          flexGrow: 1,
        }}
      >
        <Box mb={3}>
          <Typography variant="h1" fontWeight={500}>
            Empleados
          </Typography>
          <Typography mt={1} variant="body1">
            Aki se agregaran y kitaran empleados
          </Typography>
        </Box>

        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <SearchBar
            searchBy={searchBy}
            onSearch={applySearchBarFilters}
            values={filter}
          />

          <Box display="flex" gap={2}>
            <Button onClick={openCreateModal}>Crear producto</Button>
          </Box>
        </Box>

        <Table
          columns={columns}
          rows={items}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          // paginationMode="server"
          // rowCount={pagination.totalItems}
          // paginationModel={{
          //   page: pagination.currentPage - 1,
          //   pageSize: pagination.rowsPerPage,
          // }}
          // onSortModelChange={(model) =>
          //   actions.setSort(
          //     model.length
          //       ? {
          //           orderBy: model[0].field as EmployeeSort["orderBy"],
          //           orderType: model[0].sort as EmployeeSort["orderType"],
          //         }
          //       : initialEmployeeSort
          //   )
          // }
          // sortingMode="server"
          // onPaginationChange={({ page, pageSize }) => {
          //   actions.setPagination({
          //     ...pagination,
          //     currentPage: page + 1,
          //     rowsPerPage: pageSize,
          //   });
          // }}
        />
      </Card>
    </Container>
  );
};
