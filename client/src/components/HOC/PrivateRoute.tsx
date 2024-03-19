import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  isAllowed: boolean;
  children?: JSX.Element;
  redirect?: string;
};

export default function PrivateRoute({
  children,
  isAllowed,
  redirect = '/',
}: PrivateRouteProps): JSX.Element {
  const { pathname } = useLocation();

  const fnk = (): boolean | string => {
    if (pathname === '/login') return '/characters/favorites';
    if (pathname === '/signup') return '/characters';

    return false;
  };
  if (!isAllowed) return <Navigate to={fnk() ? fnk() as string : redirect} />;
  return children || <Outlet />;
}
