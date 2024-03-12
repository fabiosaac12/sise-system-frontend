/* eslint-disable react-hooks/exhaustive-deps */
import { SearchBar } from "@app/components/SearchBar";
import { Table } from "@app/components/Table";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useEmployees } from "@app/providers/employees";
import { useTable } from "./hooks/useTable";
import { useModal } from "@app/providers/modal";
import { EmployeeForm } from "./EmployeeForm/EmployeeForm";
import dayjs from "dayjs";
import { ConfirmModal } from "@app/components/ConfirmModal";
import { useStyles } from "./EmployeesStyles";

export const Employees = () => {
  const {
    catalogues,
    filter,
    list,
    getAll,
    createOne,
    deleteOne,
    deleteMany,
    editOne,
    pagination,
    setPagination,
  } = useEmployees();
  const modal = useModal();
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedEmployeeIds.length,
  });

  useEffect(() => {
    catalogues.getClients();
  }, []);

  useEffect(() => {
    getAll();
  }, [
    filter.clientId,
    filter.departmentId,
    filter.idCard,
    pagination.currentPage,
    pagination.rowsPerPage,
  ]);

  useEffect(() => {
    catalogues.getDepartments(filter.clientId);
  }, [filter.clientId]);

  const openCreateModal = () => {
    modal.open({
      content: (
        <EmployeeForm
          handleSubmit={async (data) => {
            const done = await createOne(data);

            if (done) {
              modal.close();
            }
          }}
        />
      ),
    });
  };

  const openEditModal = async () => {
    const _employee = list?.find(
      ({ id }) => id === table.selectedEmployeeIds[0]
    );

    if (_employee) {
      const { department, ...employee } = _employee;

      modal.open({
        content: (
          <EmployeeForm
            edit
            initialValues={{
              ...employee,
              clientId: department.client.id,
              departmentId: department.id,
              birthdate: dayjs(employee.birthdate),
              idCard: `${employee.idCard}`,
            }}
            handleSubmit={async (data) => {
              const done = await editOne(employee.id, data);

              if (done) {
                modal.close();
              }
            }}
          />
        ),
      });
    }
  };

  const openDeleteModal = () => {
    if (table.selectedEmployeeIds.length > 1) {
      modal.open({
        content: (
          <ConfirmModal
            Icon={DeleteIcon}
            color="error"
            confirmButtonText="Eliminar"
            title={`¿Está seguro de eliminar los ${table.selectedEmployeeIds.length} empleados seleccionados?`}
            description={
              "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
            }
            confirmButtonAction={() => deleteMany(table.selectedEmployeeIds)}
          />
        ),
      });
    } else {
      const employee = list?.find(
        ({ id }) => id === table.selectedEmployeeIds[0]
      );

      if (employee) {
        modal.open({
          content: (
            <ConfirmModal
              Icon={DeleteIcon}
              color="error"
              confirmButtonText="Eliminar"
              title={`¿Está seguro de eliminar el empleado ${employee?.firstNames}?`}
              description={
                "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
              }
              confirmButtonAction={() => deleteOne(employee.id)}
            />
          ),
        });
      }
    }
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <Card className={classes.card}>
        <Box mb={3}>
          <Typography variant="h1" fontWeight={500}>
            Empleados
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se pueden ver los empleados registrados en el
            sistema, así como editarlos, crear nuevos y eliminar
          </Typography>
        </Box>

        <Box className={classes.tableHeader}>
          {table.selectedEmployeeIds.length ? (
            <>
              <Box pl={0.5}>
                <Typography variant="h6" color="common.white">
                  {table.selectedEmployeeIds.length}{" "}
                  {table.selectedEmployeeIds.length > 1
                    ? "elementos seleccionados"
                    : "elemento seleccionado"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.invisibleButton} size="small">
                  <CreateIcon fontSize="large" />
                </IconButton>
                {table.selectedEmployeeIds.length === 1 && (
                  <IconButton size="medium" onClick={openEditModal}>
                    <EditIcon
                      sx={{ color: "common.white" }}
                      fontSize="medium"
                    />
                  </IconButton>
                )}
                <IconButton edge="end" size="medium" onClick={openDeleteModal}>
                  <DeleteIcon sx={{ color: "white" }} fontSize="medium" />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <SearchBar
                searchBy={table.filters}
                onSearch={table.applySearchBarFilters}
                values={filter}
              />
              <Box display="flex" gap={2}>
                <IconButton edge="end" size="small" onClick={openCreateModal}>
                  <CreateIcon sx={{ color: "primary.dark" }} fontSize="large" />
                </IconButton>
              </Box>
            </>
          )}
        </Box>

        <Table
          columns={table.columns}
          rows={list || []}
          multiselect
          noDataMessage={
            !filter.clientId
              ? "Seleccione un cliente para poder ver sus empleados"
              : list
              ? "No hay empleados registrados que coincidan con el filtrado"
              : "Cargando..."
          }
          onRowSelectionChange={(ids) =>
            table.setSelectedEmployeeIds(ids as string[])
          }
          paginationMode="server"
          rowCount={pagination.totalItems}
          paginationModel={{
            page: pagination.currentPage - 1,
            pageSize: pagination.rowsPerPage,
          }}
          onPaginationChange={({ page, pageSize }) => {
            setPagination((pagination) => ({
              ...pagination,
              currentPage: page + 1,
              rowsPerPage: pageSize,
            }));
          }}
        />
      </Card>
    </Container>
  );
};
