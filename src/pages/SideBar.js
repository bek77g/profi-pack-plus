import React from 'react';

const SideBar = () => {
    return (
        <div className="sideBar">
            <div className="sideBar__wrapper">
                <aside className="sideBar__aside">
                    <div className="sideBar__content">
                        <nav className="sideBar__content__nav">
                            <div className="sideBar__content__burger">
                                <div className="sideBar__content__burger__left">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="sideBar__content__burger__right sideBar__right">
                                    Каталог
                                </div>
                            </div>
                            <ul className="sideBar__content__nav__items sideBar__block">
                                <li className="sideBar__content__nav__items__item sideBar__block__items ">
                                    <img
                                        src="https://netco.kg/upload/resize_cache/iblock/b41/180_180_0/uryt413st6bnbffktxmnwwebhmsp3nr4.png"
                                        alt="" className="sideBar__img"/>
                                    <span className="sideBar__text alo">Хозяйственные товары</span>
                                    <div className="sideBarSub">
                                        <div className="sideBarSub__title">
                                            Хозяйственные товары
                                        </div>
                                        <div className="sideBarBlock__sub__nav">
                                            <ul className="sideBarBlock__sub__nav__bar sideBarSub">
                                                <li className="sideBarBlock__sub__nav__bar__item">
                                                    <img
                                                        src="https://profipackpluskgz.1c-umi.ru/images/cms/thumbs/a5b0aeaa3fa7d6e58d75710c18673bd7ec6d5f6d/57317-700x700_220_220.jpg"
                                                        alt="" className="sideBarSub__img"/>
                                                    <span className="sideBarSub__text">Фольга</span>
                                                </li>             <li className="sideBarBlock__sub__nav__bar__item">
                                                    <img
                                                        src="https://profipackpluskgz.1c-umi.ru/images/cms/thumbs/a5b0aeaa3fa7d6e58d75710c18673bd7ec6d5f6d/57317-700x700_220_220.jpg"
                                                        alt="" className="sideBarSub__img"/>
                                                    <span className="sideBarSub__text">Фольга</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SideBar;
