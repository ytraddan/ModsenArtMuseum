import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from '@components/Layout';
import Home from '@pages/Home';
import Details from '@pages/Details';
import Favourites from '@pages/Favourites';
import Error from '@pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/details/:artworkId',
        element: <Details />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
