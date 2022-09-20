import "./scss/style.scss";
import Header from "./layout/header/Header";
import PageContent from "./pages/PageContent";

function App() {
    return (
        <div className="wrapper">
            <div className="container">
                <Header/>
                <PageContent/>
            </div>
        </div>
    );
}

export default App;
