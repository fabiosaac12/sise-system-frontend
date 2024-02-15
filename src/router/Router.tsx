import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRoutes } from "./useRoutes";

export const Router = () => {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={`route-${route.path}-${index}`} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
