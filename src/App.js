import './scss/style.scss';
import Header from './layout/header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import SideBar from './pages/SideBar';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import Footer from './layout/footer/Footer';
import CatalogPageProducts from './pages/CatalogPage/components/CatalogPageProducts/CatalogPageProducts';
import Contacts from "./pages/ContactsPage/Contacts";
import About from "./pages/About/About";
import Partnership from "./pages/Partnership/Partnership";
import Order from "./pages/Order/Order";

function App() {
    return (
        <>
            <BrowserRouter>
                <SideBar/>
                <div className='container'>
                    <div className='pageContent__view'>
                        <Header/>
                        <Routes>
                            <Route path='/' element={<MainPage/>}></Route>
                            <Route path='/catalog' element={<CatalogPage/>}/>
                            <Route path='/products' element={<CatalogPageProducts/>}/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/partnership' element={<Partnership/>}/>
                            <Route path='/order' element={<Order/>}/>
                            <Route path='/contacts' element={<Contacts/>}/>
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
