import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  date: Yup.date().required("La fecha es obligatoria"),
  time: Yup.string().required("La hora es obligatoria"),
});

const MyDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ingresa tus datos</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            date: null as unknown as Date,
            time: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Lógica para manejar los datos del formulario
            console.log(values);
            onClose();
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <Field name="firstName" as={TextField} label="Nombre" fullWidth />
              <Field
                name="lastName"
                as={TextField}
                label="Apellido"
                fullWidth
              />
              <Field
                name="date"
                as={TextField}
                type="date"
                label="Fecha"
                fullWidth
              />
              <Field
                name="time"
                as={TextField}
                type="time"
                label="Hora"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
