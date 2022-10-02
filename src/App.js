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
import ContactsPage from './pages/ContactsPage/ContactsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import PartnershipPage from './pages/PartnershipPage/PartnershipPage';
import OrderPage from './pages/OrderPage/OrderPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import SubCategoryPage from './pages/SubCategoryPage/SubCategoryPage';
import SubCategoryPageCards from './pages/SubCategoryPage/components/SubCategoryPageCards';
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));

function App() {
  return (
    <>
      <Suspense fallback={Loading}>
        <BrowserRouter>
          <SideBarPage />
          <div className='container'>
            <div className='pageContent__view'>
              <Header />
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:catalog/:subCatalog' element={<CatalogPage />} />
                <Route path='/products' element={<CatalogPageProducts />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/partnership' element={<PartnershipPage />} />
                <Route path='/order' element={<OrderPage />} />
                <Route path='/contacts' element={<ContactsPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/favourite' element={<FavouritePage />} />
                <Route path='/:catalog' element={<SubCategoryPage />} />
                <Route path='/cards' element={<SubCategoryPageCards />} />
              </Routes>
              <Footer />
            </div>
          </div>
          {Toaster}
        </BrowserRouter>
      </Suspense>
    </>

    // <div className="wrapper">
    //     <div className="container">
    //         <Header/>
    //         <PageContent/>
    //     </div>
    //     <Footer/>
    // </div>
  );
}

export default App;
