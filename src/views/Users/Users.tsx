import { useModal } from "@app/providers/modal";
import { useUsers } from "@app/providers/users";
import { useTable } from "./hooks/useTable";
import { useStyles } from "./UsersStyles";
import { useEffect } from "react";
import { UserForm } from "./UserForm";
import { ConfirmModal } from "@app/components/ConfirmModal";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchBar } from "@app/components/SearchBar";
import { Table } from "@app/components/Table";

export const Users = () => {
  const {
    list,
    filter,
    pagination,
    getAll,
    sendCreateEmailOne,
    editOne,
    deleteOne,
    deleteMany,
    setPagination,
  } = useUsers();
  const modal = useModal();
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedUserIds.length,
  });

  useEffect(() => {
    getAll();
  }, [
    filter.email,
    filter.firstName,
    filter.lastName,
    pagination.currentPage,
    pagination.rowsPerPage,
  ]);

  const openCreateModal = () => {
    modal.open({
      content: (
        <UserForm
          handleSubmit={async (data) => {
            console.log(data);
            const done = await sendCreateEmailOne(data);

            if (done) {
              modal.close();
            }
          }}
        />
      ),
    });
  };

  const openEditModal = async () => {
    const _user = list?.find(({ id }) => id === table.selectedUserIds[0]);

    if (_user) {
      const { ...user } = _user;

      modal.open({
        content: (
          <UserForm
            edit
            initialValues={{
              ...user,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }}
            handleSubmit={async (data) => {
              const done = await editOne(user.id, data);

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
    if (table.selectedUserIds.length > 1) {
      modal.open({
        content: (
          <ConfirmModal
            Icon={DeleteIcon}
            color="error"
            confirmButtonText="Eliminar"
            title={`¿Está seguro de eliminar los ${table.selectedUserIds.length} usuarios seleccionados?`}
            description={
              "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
            }
            confirmButtonAction={() => deleteMany(table.selectedUserIds)}
          />
        ),
      });
    } else {
      const user = list?.find(({ id }) => id === table.selectedUserIds[0]);

      if (user) {
        modal.open({
          content: (
            <ConfirmModal
              Icon={DeleteIcon}
              color="error"
              confirmButtonText="Eliminar"
              title={`¿Está seguro de eliminar el usuario ${user?.firstName}?`}
              description={
                "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
              }
              confirmButtonAction={() => deleteOne(user.id)}
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
            Usuarios
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se pueden ver los usuarios registrados en el
            sistema, así como editarlos, crear nuevos y eliminar
          </Typography>
        </Box>

        <Box className={classes.tableHeader}>
          {table.selectedUserIds.length ? (
            <>
              <Box pl={0.5}>
                <Typography variant="h6" color="common.white">
                  {table.selectedUserIds.length}{" "}
                  {table.selectedUserIds.length > 1
                    ? "elementos seleccionados"
                    : "elemento seleccionado"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.invisibleButton} size="small">
                  <CreateIcon fontSize="large" />
                </IconButton>
                {table.selectedUserIds.length === 1 && (
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
              : "No hay clientes registrados que coincidan con el filtrado"
          }
          onRowSelectionChange={(ids) =>
            table.setSelectedUserIds(ids as string[])
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
