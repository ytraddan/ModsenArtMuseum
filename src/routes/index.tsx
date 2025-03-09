import { createBrowserRouter } from 'react-router';
import { homePageLoader, artworkPageLoader } from '@routes/loaders';
import { ROUTES } from '@constants/routes';
import ArtworkDetails from '@pages/artworkDetails/ArtworkDetails';
import Favorites from '@pages/favorites/Favorites';
import Loading from '@components/loading/Loading';
import Layout from '@components/layout/Layout';
import Error from '@pages/error/Error';
import Home from '@pages/home/Home';

const routes = [
  {
    path: ROUTES.HOME,
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
            path: ROUTES.ARTWORK,
            element: <ArtworkDetails />,
            loader: artworkPageLoader,
          },
          {
            path: ROUTES.FAVORITES,
            element: <Favorites />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
