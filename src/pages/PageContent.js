import React from 'react';
import SideBar from "./SideBar";
import MainPage from "./MainPage/MainPage";

const PageContent = () => {
    return (
        <div className="pageContent">
            <div className="pageContent__right">
                <SideBar/>
            </div>
            <div className="pageContents__left">
                <MainPage/>
            </div>
        </div>
    );
};

export default PageContent;
