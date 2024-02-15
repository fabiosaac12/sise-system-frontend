import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "./providers/theme";
import { AuthProvider } from "./providers/auth";
import { Router } from "./router/Router";

function App() {
  return (
    <ThemeProvider>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
