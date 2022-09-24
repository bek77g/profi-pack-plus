import React from 'react';
import SideBarPage from "./SideBarPage";
import MainPage from "./MainPage/MainPage";

const PageContent = () => {
    return (
        <div className="pageContent">
            <div className="pageContent__right">
                <SideBarPage/>
            </div>
            <div className="pageContents__left">
                <MainPage/>
            </div>
        </div>
    );
};

export default PageContent;
