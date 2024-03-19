import { Container, Card } from "@mui/material";
import { useStyles } from "./ConsultStyles";
import { ConsultForm } from "./ConsultForm/ConsultForm";
import { useConsult } from "@app/providers/consult";

export const Consult = () => {
  const { createOne } = useConsult();
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <Card className={classes.card}>
        <ConsultForm
          handleSubmit={async (data) => {
            const done = await createOne(data);
            console.log(data);
            if (done) {
              alert("listo compadre");
            }
          }}
        />
      </Card>
    </Container>
  );
};
