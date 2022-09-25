import './scss/style.scss';
import Header from './layout/header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import SideBarPage from './pages/SideBarPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import Footer from './layout/footer/Footer';
import CatalogPageProducts from './pages/CatalogPage/components/CatalogPageProducts/CatalogPageProducts';
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PartnershipPage from "./pages/PartnershipPage/PartnershipPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <SideBarPage/>
                <div className='container'>
                    <div className='pageContent__view'>
                        <Header/>
                        <Routes>
                            <Route path='/' element={<MainPage/>}></Route>
                            <Route path='/catalog' element={<CatalogPage/>}/>
                            <Route path='/products' element={<CatalogPageProducts/>}/>
                            <Route path='/about' element={<AboutPage/>}/>
                            <Route path='/partnership' element={<PartnershipPage/>}/>
                            <Route path='/order' element={<OrderPage/>}/>
                            <Route path='/contacts' element={<ContactsPage/>}/>
                            <Route path='/cart' element={<CartPage/>}/>
                            <Route path='/checkout' element={<CheckoutPage/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
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
