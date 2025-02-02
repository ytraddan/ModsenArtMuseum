import { createBrowserRouter, RouterProvider } from 'react-router';
import { homePageLoader, artworkPageLoader } from '@utils/loaders';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import ArtworkDetails from '@pages/ArtworkDetails';
import Favorites from '@pages/Favorites';
import Loading from '@components/Loading';
import Layout from '@components/Layout';
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
            loader: homePageLoader,
          },
          {
            path: '/artwork/:artworkId',
            element: <ArtworkDetails />,
            loader: artworkPageLoader,
          },
          {
            path: '/favorites',
            element: <Favorites />,
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
