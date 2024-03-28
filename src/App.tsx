import "dayjs/locale/es";
import { EventualityProvider } from "./providers/eventuality";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "./providers/theme";
import { AuthProvider } from "./providers/auth";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/modal";
import { EmployeesProvider } from "./providers/employees";
import { ConsultProvider } from "./providers/consult";
import { DeparmentsProvider } from "./providers/deparments";
import { ClientsProvider } from "./providers/clients";
import { MorbidityProvider } from "./providers/morbidity";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <ClientsProvider>
              <DeparmentsProvider>
                <EmployeesProvider>
                  <EventualityProvider>
                    <ConsultProvider>
                      <MorbidityProvider>
                        <Router />
                      </MorbidityProvider>
                    </ConsultProvider>
                  </EventualityProvider>
                </EmployeesProvider>
              </DeparmentsProvider>
            </ClientsProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
