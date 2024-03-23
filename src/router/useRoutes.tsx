import { AuthRoleEnum, AuthStatusEnum } from "@app/enums/auth";
import { BaseLayout } from "@app/layouts";
import { LoginLayout } from "@app/layouts/LoginLayout";
import { useAuth } from "@app/providers/auth";
import { Clients } from "@app/views/Clients";
import { Departmets } from '@app/views/Departments/Departmets';
import { Employees } from "@app/views/Employees";
import { Morbidity } from "@app/views/Morbidity";
import { Reports } from "@app/views/Reports";
import { Login } from "@app/views/auth/Login/Login";
import { RouteProps, Navigate } from "react-router-dom";


export const useRoutes = () => {
  const auth = useAuth();

  const loggedOutRoutes: RouteProps[] = [
    {
      path: '/login',
      element: (
        <LoginLayout>
          <Login />
        </LoginLayout>
      ),
    },
    {
      path: '/*',
      element: <Navigate to='/login' replace={true} />,
    },
  ];

  const adminRoutes: RouteProps[] = [
    {
      path: '/',
      element: (
        <BaseLayout>
          <Morbidity />
        </BaseLayout>
      ),
    },
    {
      path: "/reports",
      element: (
        <BaseLayout>
          <Reports />
        </BaseLayout>
      ),
    },
    {
      path: '/employees',
      element: (
        <BaseLayout>
          <Employees />
        </BaseLayout>
      ),
    },
    {

      path: '/departments',
      element: (
        <BaseLayout>
          <Departmets />
        </BaseLayout>
      ),
    },
    {
      path: "/clients",
      element: (
        <BaseLayout>
          <Clients />
        </BaseLayout>
      ),
    },
    {

      path: "/*",
      element: <Navigate to="/" replace={true} />,

    },
  ];

  const userRoutes: RouteProps[] = [
    {
      path: '/',
      element: (
        <BaseLayout>
          <Morbidity />
        </BaseLayout>
      ),
    },
    {
      path: "/reports",
      element: (
        <BaseLayout>
          <Reports />
        </BaseLayout>
      ),
    },
    {
      path: '/employees',
      element: (
        <BaseLayout>
          <Employees />
        </BaseLayout>
      ),
    },
    {

      path: "/clients",
      element: (
        <BaseLayout>
          <Clients />
        </BaseLayout>
      ),
    },
    {
      path: "/*",
      element: <Navigate to="/" replace={true} />,

    },
  ];

  const routes =
    auth.status === AuthStatusEnum.loggedOut
      ? loggedOutRoutes
      : auth.role === AuthRoleEnum.admin
      ? adminRoutes
      : auth.role === AuthRoleEnum.user
      ? userRoutes
      : [];

  return routes;
};
