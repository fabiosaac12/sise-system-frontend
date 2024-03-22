/* eslint-disable react-hooks/exhaustive-deps */
import { SearchBar } from "@app/components/SearchBar";
import { Table } from "@app/components/Table";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useClients } from "@app/providers/clients";
import { useTable } from "./hooks/useTable";
import { useModal } from "@app/providers/modal";
import { ClientForm } from "./ClientForm";
import { ConfirmModal } from "@app/components/ConfirmModal";
import { useStyles } from "./ClientsStyles";

export const Clients = () => {
  const {
    filter,
    list,
    getAll,
    createOne,
    deleteOne,
    deleteMany,
    editOne,
    pagination,
    setPagination,
  } = useClients();
  const modal = useModal();
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedClientIds.length,
  });

  useEffect(() => {
    getAll();
  }, [filter.name, pagination.currentPage, pagination.rowsPerPage]);

  const openCreateModal = () => {
    modal.open({
      content: (
        <ClientForm
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
    const _client = list?.find(({ id }) => id === table.selectedClientIds[0]);

    if (_client) {
      const { ...client } = _client;

      modal.open({
        content: (
          <ClientForm
            edit
            initialValues={{
              ...client,
              name: client.name,
            }}
            handleSubmit={async (data) => {
              const done = await editOne(client.id, data);

              if (done) {
                modal.close();
              }
            }}
          />
        ),
      });
    }
  };
  console.log(filter);
  const openDeleteModal = () => {
    if (table.selectedClientIds.length > 1) {
      modal.open({
        content: (
          <ConfirmModal
            Icon={DeleteIcon}
            color="error"
            confirmButtonText="Eliminar"
            title={`¿Está seguro de eliminar los ${table.selectedClientIds.length} clientes seleccionados?`}
            description={
              "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
            }
            confirmButtonAction={() => deleteMany(table.selectedClientIds)}
          />
        ),
      });
    } else {
      const client = list?.find(({ id }) => id === table.selectedClientIds[0]);

      if (client) {
        modal.open({
          content: (
            <ConfirmModal
              Icon={DeleteIcon}
              color="error"
              confirmButtonText="Eliminar"
              title={`¿Está seguro de eliminar el clientes ${client?.name}?`}
              description={
                "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
              }
              confirmButtonAction={() => deleteOne(client.id)}
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
            Clientes
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se pueden ver los clientes registrados en el
            sistema, así como editarlos, crear nuevos y eliminar
          </Typography>
        </Box>

        <Box className={classes.tableHeader}>
          {table.selectedClientIds.length ? (
            <>
              <Box pl={0.5}>
                <Typography variant="h6" color="common.white">
                  {table.selectedClientIds.length}{" "}
                  {table.selectedClientIds.length > 1
                    ? "elementos seleccionados"
                    : "elemento seleccionado"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.invisibleButton} size="small">
                  <CreateIcon fontSize="large" />
                </IconButton>
                {table.selectedClientIds.length === 1 && (
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
            !list
              ? "Cargando..."
              : "No hay clients registrados que coincidan con el filtrado"
          }
          onRowSelectionChange={(ids) =>
            table.setSelectedClientIds(ids as string[])
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
