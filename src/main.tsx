import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { homePageLoader } from '@utils/loaders';
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
        loader: homePageLoader,
        errorElement: <Error />,
      },
      {
        path: '/details/:artworkId',
        element: <Details />,
        errorElement: <Error />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
        errorElement: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
