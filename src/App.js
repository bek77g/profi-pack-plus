import "./scss/style.scss";
import Header from "./layout/header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./pages/SideBar";
import CatalogPage from "./pages/CatalogPage/CatalogPage";

function App() {
    return (

        <div className="container">
            <Header/>
            <SideBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                    </Route>
                    <Route path="catalog" element={<CatalogPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>

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
