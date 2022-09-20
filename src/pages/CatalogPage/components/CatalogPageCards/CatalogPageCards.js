import React from 'react';
import heart from "../../../../assets/icons/favourite.svg";
import cart from "../../../../assets/icons/cart.svg";
import secondCatalog from "../../../../components/constants/secondCatalog";
import PaginationComp from "../../../../components/Pagination";
import {Link} from "react-router-dom";

const CatalogPageCards = () => {

    const newCatalog = secondCatalog.map(elem => {
        return (
            <>
                <Link to="/products">
                    <div className="catalogPagePopular__catalogs__cards__card">
                        <div className="catalogPagePopular__catalogs__cards__card__heart">
                            <img src={heart} alt="heart"/>
                        </div>
                        <div className="catalogPagePopular__catalogs__cards__card__img">
                            <img
                                className="d-block w-100"
                                src={elem.img}
                                alt="First slide"
                            />
                        </div>
                        <div className="catalogPagePopular__catalogs__cards__card__descr">
                            <h5>{elem.description}</h5>
                            <p>{elem.price}</p>
                            <div className="catalogPagePopular__catalogs__cards__card__cart">
                                <img src={cart} alt="cart"/>
                            </div>
                        </div>
                    </div>
                </Link>
            </>
        )
    })

    return (<>
            <div className="catalogPagePopular__catalogs__cards">
                {newCatalog}
            </div>
            <PaginationComp/>
        </>
    );
};

export default CatalogPageCards;
