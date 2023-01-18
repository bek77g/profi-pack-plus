import React, { Suspense } from 'react';
import './scss/style.scss';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import PageLoading from './layout/loading/PageLoading';
// import { ReviewsConfigContext, ReviewsProvider } from 'strapi-ratings-client';
// import { useContext } from 'react';
// import { CustomContext } from './hoc/mainContentContext';
// import { useEffect } from 'react';

const Header = React.lazy(() => import('./layout/header/Header'));
const Footer = React.lazy(() => import('./layout/footer/Footer'));
const SideBarPage = React.lazy(() => import('./pages/SideBarPage'));
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
        <BrowserRouter>
          <SideBarPage />
          <div className='container'>
            <div className='pageContent__view'>
              <Header />
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:catalog' element={<SubCategoryPage />} />
                <Route path='/:catalog/:subCatalog' element={<CatalogPage />} />
                <Route
                  path='/:catalog/:subCatalog/:product'
                  element={<CatalogPageProducts />}
                />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/partnership' element={<PartnershipPage />} />
                <Route path='/order' element={<OrderPage />} />
                <Route path='/contacts' element={<ContactsPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/favourite' element={<FavouritePage />} />
                <Route path='/cards' element={<SubCategoryPageCards />} />
                <Route path='*' element={<NotFounf />} />
              </Routes>
              <Footer />
            </div>
          </div>
          {Toaster}
        </BrowserRouter>
      </Suspense>
      {/* </ReviewsProvider> */}
    </>
  );
}

export default App;
