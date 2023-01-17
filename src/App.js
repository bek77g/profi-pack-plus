import React, { Suspense } from 'react';
import Loading from './layout/loading/Loading';
import './scss/style.scss';
import { Toaster } from 'react-hot-toast';
import Header from './layout/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBarPage from './pages/SideBarPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import Footer from './layout/footer/Footer';
import CatalogPageProducts from './pages/CatalogPage/components/CatalogPageProducts/CatalogPageProducts';
import PartnershipPage from './pages/PartnershipPage/PartnershipPage';
import CartPage from './pages/CartPage/CartPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import SubCategoryPage from './pages/SubCategoryPage/SubCategoryPage';
import SubCategoryPageCards from './pages/SubCategoryPage/components/SubCategoryPageCards';
import NotFounf from './pages/NotFound/NotFounf';
import 'react-loading-skeleton/dist/skeleton.css';
// import { ReviewsConfigContext, ReviewsProvider } from 'strapi-ratings-client';
// import { useContext } from 'react';
// import { CustomContext } from './hoc/mainContentContext';
// import { useEffect } from 'react';

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
      <Suspense fallback={Loading}>
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
