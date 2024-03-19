import React, { useEffect } from 'react';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './components/pages/CharactersPage';
import { useAppDispatch } from './redux/hooks';
import Root from './components/Root';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import { refreshAuth } from './redux/slices/auth/thunks';
import OneCharacterPage from './components/pages/OneCharacterPage';
import SignupPage from './components/pages/SignupPage';
import { getAllCharsThunk } from './redux/slices/characters/thunks';
import FiltersPage from './components/pages/FiltersPage/FiltersPage';
import FavoritesPage from './components/pages/FavoritesPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getAllCharsThunk());
    void dispatch(refreshAuth());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: (
        <>
          <h1>Ошибка</h1>
          <Link to="/">На главную</Link>
        </>
      ),
      children: [
        { path: '/', element: <MainPage /> },
        {
          path: '/characters',
          element: <CharactersPage />,
        },
        {
          path: '/characters/filters',
          element: <FiltersPage />,
        },
        {
          path: '/characters/favorites',
          element: <FavoritesPage />,
        },
        {
          path: '/characters/:id',
          element: <OneCharacterPage />,
        },
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <SignupPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
