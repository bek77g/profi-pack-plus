import React from 'react';
import search from "../../../../components/constants";
import arr from "../../../../assets/icons/arr.svg";

const MainPageSearchCards = () => {

    const newSearch = search.map(elem => {
        return (<div className="mainPageSearchCards">
                <div className="mainPageSearchCards__card">
                    <div className="mainPageSearchCards__card__left">
                        <h2 className="mainPageSearchCards__card__left__title">
                            {elem.name}
                        </h2>
                        <div className="mainPageSearchCards__card__left__btn">
                            <button>Подробнее <img src={arr} alt="arr"/></button>
                        </div>
                    </div>
                    <div className="mainPageSearchCards__card__right">
                        <img src={elem.img} alt="img"/>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="mainPageSearchCards">
            {newSearch}
        </div>
    );
};

export default MainPageSearchCards;
