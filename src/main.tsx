import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { homePageLoader } from '@utils/loaders';
import Layout from '@components/Layout';
import Favourites from '@pages/Favourites';
import Loading from '@components/Loading';
import Details from '@pages/Details';
import Error from '@pages/Error';
import Home from '@pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        hydrateFallbackElement: <Loading />,
        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <Error />,
            loader: homePageLoader,
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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
