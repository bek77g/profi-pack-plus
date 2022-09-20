import React from 'react';
import MainPageAdvertise from "./components/MainPageAdvertise/MainPageAdvertise";
import MainPageSearch from "./components/MainPageSearch/MainPageSearch";
import MainPagePopular from "./components/MainPagePopular/MainPagePopular";

const MainPage = () => {
    return (
        <div className="mainPage">
            <MainPageAdvertise/>
            <MainPageSearch/>
            <MainPagePopular/>
        </div>
    );
};

export default MainPage;
