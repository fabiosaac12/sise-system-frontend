import { Clear, Check } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

export function MorbidityFormDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const date = formJson.date;
          const time = formJson.time;
          const identification = formJson.identification;
          const firstNames = formJson.firstNames;
          const lastNames = formJson.lastNames;
          const diagnostic = formJson.diagnostic;
          const treatment = formJson.treatment;
          const quantity = formJson.quantity;
          console.log(
            date,
            time,
            identification,
            firstNames,
            lastNames,
            diagnostic,
            treatment,
            quantity
          );
        },
        sx: { borderRadius: "25px" },
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          paddingTop: "33px",
          paddingBottom: "0",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        MORBILIDAD
      </DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom="20px" textAlign="center">
          Introduce la información respectiva de Morbilidad
        </DialogContentText>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="36px"
        >
          <Box display="flex" flexDirection="column">
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Fecha
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="date"
              name="date"
              placeholder="Seleccionar"
              type="text"
              sx={{ width: 250 }}
              fullWidth
              variant="outlined"
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Cédula
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="identification"
              name="identification"
              placeholder="Seleccionar"
              type="number"
              fullWidth
              variant="outlined"
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Apellidos
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="lastNames"
              name="lastNames"
              placeholder="Describir..."
              type="text"
              fullWidth
              sx={{ width: 250 }}
              variant="outlined"
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Tratamiento
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="treatment"
              name="treatment"
              placeholder="Seleccionar"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Hora
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="time"
              name="time"
              placeholder="Describir..."
              type="number"
              fullWidth
              variant="outlined"
              sx={{ width: "250px" }}
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Nombres
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstNames"
              name="firstNames"
              placeholder="Describir..."
              type="text"
              fullWidth
              variant="outlined"
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Diagnóstico
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="diagnostic"
              name="diagnostic"
              placeholder="Describir..."
              type="text"
              fullWidth
              variant="outlined"
            />
            <Typography marginTop="10px" marginLeft="3px" fontWeight="600">
              Cantidad
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="quantity"
              name="quantity"
              placeholder="Describir..."
              type="number"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap="36px"
        >
          <Button
            onClick={onClose}
            sx={{
              width: 250,
              height: 40,
              backgroundColor: "#CB055C",
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          >
            <Clear
              sx={{ width: "20px", height: "20px", marginBottom: "2.5px" }}
            />
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={onClose}
            sx={{
              width: 250,
              height: 40,
              backgroundColor: "#EF579A",
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          >
            <Check
              sx={{ width: "20px", height: "20px", marginBottom: "3px" }}
            />
            Confirmar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
