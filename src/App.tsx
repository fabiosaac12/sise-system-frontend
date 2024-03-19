import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "./providers/theme";
import { AuthProvider } from "./providers/auth";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/modal";
import { EmployeesProvider } from "./providers/employees";
import { ConsultProvider } from "./providers/consult";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <ConsultProvider>
              <EmployeesProvider>
                <Router />
              </EmployeesProvider>
            </ConsultProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
