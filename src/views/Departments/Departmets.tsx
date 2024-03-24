import { Table } from "@app/components/Table";
import { useDeparments } from "@app/providers/deparments";
import { useModal } from "@app/providers/modal";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./departmentsStyles";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DepartmentForm } from "./DepartmentsForm";
import { useTable } from "./hooks/useTable";
import { SearchBar } from "@app/components/SearchBar";
import { ConfirmModal } from "@app/components/ConfirmModal";
import { useLocation } from "react-router-dom";
export const Departmets = () => {
  const query = new URLSearchParams(useLocation().search);
  const [clientId, setClientId] = useState(query.get("clientid"));

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
    applyFilters,
  } = useDeparments();
  const modal = useModal();
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedDeparmentsIds.length,
  });

  useEffect(() => {
    catalogues.getClients();
  }, []);

  // if (clientId) {
  //   applyFilters({ clientId });
  // }
  useEffect(() => {
    if (clientId) {
      applyFilters({ clientId });
      setClientId("");
    } else {
      getAll();
    }
  }, [filter.clientId, pagination.currentPage, pagination.rowsPerPage]);

  const openCreateModal = () => {
    modal.open({
      content: (
        <DepartmentForm
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
    const _deparment = list?.find(
      ({ id }) => id === table.selectedDeparmentsIds[0],
    );

    if (_deparment) {
      // const { department } = _deparment;

      modal.open({
        content: (
          <DepartmentForm
            edit
            initialValues={{
              name: _deparment.name,
              clientId: _deparment.clientId,
            }}
            handleSubmit={async (data) => {
              const done = await editOne(data, _deparment.id);

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
    if (table.selectedDeparmentsIds.length > 1) {
      const departments = list
        ?.filter(({ id }) => table.selectedDeparmentsIds.includes(id))
        ?.map(({ name }) => name);

      console.log(departments);
      modal.open({
        content: (
          <ConfirmModal
            Icon={DeleteIcon}
            color="error"
            confirmButtonText="Eliminar"
            title={`¿Está seguro de eliminar los ${table.selectedDeparmentsIds.length} departamentos seleccionados?`}
            description={`Los departamentos ${
              table.selectedDeparmentsIds.length > 2
                ? departments?.slice(0, -1).join(", ") +
                  ` y ${departments?.slice(-1)}`
                : departments?.join(" y ")
            } seran eliminados. Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder.`}
            confirmButtonAction={() => deleteMany(table.selectedDeparmentsIds)}
          />
        ),
      });
    } else {
      const department = list?.find(
        ({ id }) => id === table.selectedDeparmentsIds[0],
      );

      if (department) {
        modal.open({
          content: (
            <ConfirmModal
              Icon={DeleteIcon}
              color="error"
              confirmButtonText="Eliminar"
              title={`¿Está seguro de eliminar el departamento '${department.name}'?`}
              description={
                "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
              }
              confirmButtonAction={() => deleteOne(department.id)}
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
          <Typography variant="h2" fontWeight={500}>
            Departamentos
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se pueden ver los departamentos registrados en el
            sistema, así como editarlos, crear nuevos y eliminar
          </Typography>
        </Box>

        <Box className={classes.tableHeader}>
          {table.selectedDeparmentsIds.length ? (
            <>
              <Box pl={0.5}>
                <Typography variant="h6" color="common.white">
                  {table.selectedDeparmentsIds.length}{" "}
                  {table.selectedDeparmentsIds.length > 1
                    ? "elementos seleccionados"
                    : "elemento seleccionado"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.invisibleButton} size="small">
                  <CreateIcon fontSize="large" />
                </IconButton>
                {table.selectedDeparmentsIds.length === 1 && (
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
                values={{ ...filter }}
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
              ? "Seleccione un cliente para poder ver sus departamentos"
              : list
              ? "No hay departamentos registrados que coincidan con el filtrado"
              : "Cargando..."
          }
          onRowSelectionChange={(ids) =>
            table.setSelectedDeparmentsIds(ids as string[])
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
