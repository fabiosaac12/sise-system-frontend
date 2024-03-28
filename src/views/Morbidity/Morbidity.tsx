/* eslint-disable react-hooks/exhaustive-deps */
import { SearchBar } from "@app/components/SearchBar";
import { Table } from "@app/components/Table";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useTable } from "./hooks/useTable";
import { useModal } from "@app/providers/modal";
import dayjs from "dayjs";
import { ConfirmModal } from "@app/components/ConfirmModal";
import { useStyles } from "./MorbidityStyles";
import { useMorbidity } from "@app/providers/morbidity";
import { MorbidityForm } from "./MorbidityForm/MorbidityForm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";

export const Morbidity = () => {
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
  } = useMorbidity();
  const modal = useModal();
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedMorbidityIds.length,
  });

  useEffect(() => {
    catalogues.getClients();
    applyFilters({ date: new Date().toISOString() });
  }, []);

  useEffect(() => {
    getAll();
  }, [
    filter.clientId,
    filter.date,
    filter.workPosition,
    pagination.currentPage,
    pagination.rowsPerPage,
  ]);

  const openCreateModal = () => {
    modal.open({
      content: (
        <MorbidityForm
          handleSubmit={async (data) => {
            let year = data.date.toDate().getFullYear();
            let month = data.date.toDate().getMonth();
            let day = data.date.toDate().getDate();
            let hours = data.hour.toDate().getHours();
            let minutes = data.hour.toDate().getMinutes();

            let date = new Date(year, month, day, hours, minutes);

            const done = await createOne({
              ...data,
              dateTime: dayjs(date),
              quantity: +(data.quantity ?? 0),
              treatment: data.treatment || null,
            });
            // console.log(`${year}, ${month}, ${day}, ${hours}, ${minutes}`);

            if (done) {
              modal.open({
                content: (
                  <ConfirmModal
                    Icon={CheckCircleOutlineIcon}
                    color={"success"}
                    title={"EXITO"}
                    description={
                      "La morbilidad ha sido registrada satisfactoriamente"
                    }
                    confirmButtonText={"aceptar"}
                  ></ConfirmModal>
                ),
              });
            } else {
              modal.open({
                content: (
                  <ConfirmModal
                    Icon={ErrorIcon}
                    color={"error"}
                    title={"ERROR"}
                    description={"no se ha podido generar la morbilidad..."}
                    confirmButtonText={"aceptar"}
                  ></ConfirmModal>
                ),
              });
            }
          }}
        />
      ),
    });
  };

  const openEditModal = async () => {
    const _morbidity = list?.find(
      ({ id }) => id === table.selectedMorbidityIds[0],
    );

    if (_morbidity) {
      const { ...morbidity } = _morbidity;

      modal.open({
        content: (
          <MorbidityForm
            edit
            initialValues={{
              ...morbidity,
              date: dayjs(morbidity.dateTime),
              hour: dayjs(morbidity.dateTime),
              quantity: `${morbidity.quantity ?? 0}`,
              idCard: `${morbidity.employee.idCard}`,
              treatment: `${morbidity.treatment ?? ""}`,
            }}
            handleSubmit={async (data) => {
              let year = data.date.toDate().getFullYear();
              let month = data.date.toDate().getMonth();
              let day = data.date.toDate().getDate();
              let hours = data.hour.toDate().getHours();
              let minutes = data.hour.toDate().getMinutes();

              let date = new Date(year, month, day, hours, minutes);

              const done = await editOne(morbidity.id, {
                ...data,
                dateTime: dayjs(date),
                quantity: +(data.quantity ?? 0),
                treatment: data.treatment || null,
              });

              if (done) {
                modal.open({
                  content: (
                    <ConfirmModal
                      Icon={CheckCircleOutlineIcon}
                      color={"success"}
                      title={"EXITO"}
                      description={
                        "La morbilidad ha sido editada satisfactoriamente"
                      }
                      confirmButtonText={"aceptar"}
                    ></ConfirmModal>
                  ),
                });
              } else {
                modal.open({
                  content: (
                    <ConfirmModal
                      Icon={ErrorIcon}
                      color={"error"}
                      title={"ERROR"}
                      description={"no se ha podido editar la morbilidad..."}
                      confirmButtonText={"aceptar"}
                    ></ConfirmModal>
                  ),
                });
              }
            }}
          />
        ),
      });
    }
  };

  const openDeleteModal = () => {
    if (table.selectedMorbidityIds.length > 1) {
      modal.open({
        content: (
          <ConfirmModal
            Icon={DeleteIcon}
            color="error"
            confirmButtonText="Eliminar"
            title={`¿Está seguro de eliminar los ${table.selectedMorbidityIds.length} empleados seleccionados?`}
            description={
              "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
            }
            confirmButtonAction={() => deleteMany(table.selectedMorbidityIds)}
          />
        ),
      });
    } else {
      const morbidity = list?.find(
        ({ id }) => id === table.selectedMorbidityIds[0],
      );

      if (morbidity) {
        modal.open({
          content: (
            <ConfirmModal
              Icon={DeleteIcon}
              color="error"
              confirmButtonText="Eliminar"
              title={`¿Está seguro de eliminar el registro de ${morbidity?.employee.firstNames}?`}
              description={
                "Esta acción es irreversible. Le recomendamos que considere cuidadosamente las consecuencias antes de proceder."
              }
              confirmButtonAction={() => deleteOne(morbidity.id)}
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
            Morbilidad
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se pueden ver todos los registros relacionados con
            los emleados, asi como crear, editar o elimnarlos
          </Typography>
        </Box>

        <Box className={classes.tableHeader}>
          {table.selectedMorbidityIds.length ? (
            <>
              <Box pl={0.5}>
                <Typography variant="h6" color="common.white">
                  {table.selectedMorbidityIds.length}{" "}
                  {table.selectedMorbidityIds.length > 1
                    ? "elementos seleccionados"
                    : "elemento seleccionado"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.invisibleButton} size="small">
                  <CreateIcon fontSize="large" />
                </IconButton>
                {table.selectedMorbidityIds.length === 1 && (
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
              ? "Seleccione un cliente para poder ver sus registros..."
              : list
              ? "No hay registros que coincidan con el filtrado"
              : "Cargando..."
          }
          onRowSelectionChange={(ids) =>
            table.setSelectedMorbidityIds(ids as string[])
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
