import { Box, CircularProgress, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import { useStyles } from "./ValidateIdCardModalStyles";
import { useEmployees } from "@app/providers/employees";
import { EmployeeData } from "@app/models/employee.model";

type Props = {
  idCard: number;
  setIdValidate: (valor: boolean) => void;
};
export const ValidateIdCardModal: FC<Props> = ({ idCard, setIdValidate }) => {
  const classes = useStyles();
  const { getEmployee } = useEmployees();
  const [employee, setEmployee] = useState<EmployeeData>();
  const [state, setState] = useState("pending");
  const [carga, setCarga] = useState("Cargando");
  const [response, setResponse] = useState(
    "Espere unos segundo mientras comprobamos le cedula del usuario",
  );
  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      const etapas = ["Cargando.", "Cargando..", "Cargando..."];
      setCarga(etapas[index]);

      if (index === 2) {
        index = 0;
      } else {
        index++;
      }
    }, 500);

    (async () => {
      const apiResponse = await getEmployee(idCard);

      if (apiResponse) {
        setResponse(`El empleado a sido encontrado satisfactoriamente.`);
        setEmployee(apiResponse);
        setState("succesfully");
        setIdValidate(true);
      } else {
        setResponse("No se ha podido encontrar el usuario solicitado");
        setState("fail");
        setIdValidate(false);
      }
      clearInterval(intervalId);
    })();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.loaderWrapper}>
        {state === "pending" ? (
          <>
            <CircularProgress size={"4.5rem"} />{" "}
            <Typography variant="h6" fontSize="1rem">
              {carga}
            </Typography>
          </>
        ) : state === "succesfully" ? (
          <>
            <CheckCircleOutlineIcon
              sx={{ color: "#4caf50", fontSize: "4.5rem" }}
            />
            <Typography variant="h6" fontSize={"1.3rem"}>
              SE CONSIGUIO!
            </Typography>
          </>
        ) : (
          <>
            <ErrorIcon sx={{ color: "#ef5350", fontSize: "4.5rem" }} />
            <Typography variant="h6" fontSize={"1.3rem"}>
              Error...
            </Typography>
          </>
        )}
      </Box>

      <Box className={classes.descriptionContainer}>
        <Typography align="center">{response}</Typography>

        {employee && (
          <>
            <Typography>
              <Typography
                variant="caption"
                fontWeight={"bold"}
                fontSize={".9rem"}
              >
                Nombres:
              </Typography>{" "}
              {employee?.firstNames}
            </Typography>
            <Typography>
              <Typography
                variant="caption"
                fontWeight={"bold"}
                fontSize={".9rem"}
              >
                Apellidos:
              </Typography>{" "}
              {employee?.lastNames}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};