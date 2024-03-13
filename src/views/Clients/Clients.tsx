import { useTable } from "./hooks/useTable";
import { useStyles } from "./ClientsStyles";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Clients = () => {
  const table = useTable();
  const classes = useStyles({
    selectedLength: table.selectedClientIds.length,
  });

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
                  <IconButton size="medium">
                    <EditIcon
                      sx={{ color: "common.white" }}
                      fontSize="medium"
                    />
                  </IconButton>
                )}
                <IconButton edge="end" size="medium">
                  <DeleteIcon sx={{ color: "white" }} fontSize="medium" />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" gap={2}>
                <IconButton edge="end" size="small">
                  <CreateIcon sx={{ color: "primary.dark" }} fontSize="large" />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </Container>
  );
};
