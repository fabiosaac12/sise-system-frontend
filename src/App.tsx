import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "./providers/theme";
import { AuthProvider } from "./providers/auth";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/modal";
import { EmployeesProvider } from "./providers/employees";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <EmployeesProvider>
              <Router />
            </EmployeesProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
