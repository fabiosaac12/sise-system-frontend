import { AuthRoleEnum, AuthStatusEnum } from '@app/enums/auth';
import { BaseLayout } from '@app/layouts';
import { useAuth } from '@app/providers/auth';
import { Morbidity } from '@app/views/Morbidity';
import { Login } from '@app/views/auth/Login/Login';
import { RouteProps, Navigate } from 'react-router-dom';

export const useRoutes = () => {
  const auth = useAuth();

  const loggedOutRoutes: RouteProps[] = [
    {
      path: '/login',
      element: (
        <BaseLayout>
          <Login />
        </BaseLayout>
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
      path: '/*',
      element: <Navigate to='/' replace={true} />,
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
      path: '/*',
      element: <Navigate to='/' replace={true} />,
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
