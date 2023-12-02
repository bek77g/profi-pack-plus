import React, { Suspense } from 'react';
import './scss/style.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import PageLoading from './layout/loading/PageLoading';
import MainLayout from './components/MainLayout';
// import { ReviewsConfigContext, ReviewsProvider } from 'strapi-ratings-client';
// import { useContext } from 'react';
// import { CustomContext } from './hoc/mainContentContext';
// import { useEffect } from 'react';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CatalogPageProducts = React.lazy(() =>
  import(
    './pages/CatalogPage/components/CatalogPageProducts/CatalogPageProducts'
  )
);
const PartnershipPage = React.lazy(() =>
  import('./pages/PartnershipPage/PartnershipPage')
);
const CartPage = React.lazy(() => import('./pages/CartPage/CartPage'));
const FavouritePage = React.lazy(() =>
  import('./pages/FavouritePage/FavouritePage')
);
const SubCategoryPage = React.lazy(() =>
  import('./pages/SubCategoryPage/SubCategoryPage')
);
const SubCategoryPageCards = React.lazy(() =>
  import('./pages/SubCategoryPage/components/SubCategoryPageCards')
);
const NotFounf = React.lazy(() => import('./pages/NotFound/NotFounf'));

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const OrderPage = React.lazy(() => import('./pages/OrderPage/OrderPage'));
const ContactsPage = React.lazy(() =>
  import('./pages/ContactsPage/ContactsPage')
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/:catalog', element: <SubCategoryPage /> },
      { path: '/:catalog/:subCatalog', element: <CatalogPage /> },
      {
        path: '/:catalog/:subCatalog/:product',
        element: <CatalogPageProducts />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/partnership',
        element: <PartnershipPage />,
      },
      {
        path: '/order',
        element: <OrderPage />,
      },
      {
        path: '/contacts',
        element: <ContactsPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/favourite',
        element: <FavouritePage />,
      },
      {
        path: '/cards',
        element: <SubCategoryPageCards />,
      },
      {
        path: '*',
        element: <NotFounf />,
      },
    ],
  },
]);

function App() {
  // const { baseUrl } = useContext(CustomContext);
  // const { setUser } = useContext(ReviewsConfigContext);

  // useEffect(
  //   () =>
  //     setUser(),
  //   []
  // );

  return (
    <>
      {/* <ReviewsProvider apiURL={baseUrl}> */}
      <Suspense fallback={<PageLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      {/* </ReviewsProvider> */}
    </>
  );
}

export default App;
