import { Container, Card, Box, Typography } from "@mui/material";
import { useStyles } from "./ConsultStyles";
import { ConsultForm } from "./ConsultForm/ConsultForm";
import { useConsult } from "@app/providers/consult";
import { useModal } from "@app/providers/modal";
import { ConfirmModal } from "@app/components/ConfirmModal";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const Consult = () => {
  const { createOne } = useConsult();
  const classes = useStyles();
  const modal = useModal();

  return (
    <Container className={classes.container} maxWidth="xl">
      <Card className={classes.card}>
        <Box mb={3}>
          <Typography variant="h2" fontWeight={500}>
            Consulta
          </Typography>
          <Typography mt={1} variant="body1">
            En este apartado se crean las consultas de los empleados
          </Typography>
        </Box>
        <ConsultForm
          handleSubmit={async (data) => {
            const done = await createOne(data);
            console.log(data);
            if (done) {
              modal.open({
                content: (
                  <ConfirmModal
                    Icon={CheckCircleOutlineIcon}
                    color={"success"}
                    title={"EXITO"}
                    description={
                      "La eventualidad ha sido registrada satisfactoriamente"
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
                    description={"no se ha podido generar la consulta..."}
                    confirmButtonText={"aceptar"}
                  ></ConfirmModal>
                ),
              });
            }
          }}
        />
      </Card>
    </Container>
  );
};
