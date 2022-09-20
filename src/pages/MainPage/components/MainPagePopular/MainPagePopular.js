import React from 'react';
import MainPageSearchSelect from "../MainPageSearch/MainPageSearchSelect";
import Carousel from 'react-bootstrap/Carousel';
import heart from "../../../../assets/icons/favourite.svg";
import cart from "../../../../assets/icons/cart.svg";
import catalog from "../../../../components/constants/catalog";

const MainPagePopular = () => {

    const newCatalog = catalog.map(elem => {
        return (
            <div className="mainPagePopular__catalog__cards__card">
                <div className="mainPagePopular__catalog__cards__card__heart">
                    <img src={heart} alt="heart"/>
                </div>
                <div className="mainPagePopular__catalog__cards__card__img">
                    <img
                        className="d-block w-100"
                        src={elem.img}
                        alt="First slide"
                    />
                </div>
                <div className="mainPagePopular__catalog__cards__card__descr">
                    <h5>{elem.description}</h5>
                    <p>{elem.price}</p>
                    <div className="mainPagePopular__catalog__cards__card__cart">
                        <img src={cart} alt="cart"/>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="mainPagePopular">
            <div className="mainPagePopular__catalog">
                <MainPageSearchSelect/>
            </div>
            <Carousel variant="dark">
                <Carousel.Item>
                    <div className="mainPagePopular__catalog__cards">
                        {newCatalog}
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default MainPagePopular;
