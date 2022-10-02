import React, { useContext, useEffect } from 'react';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { HandySvg } from 'handy-svg';
import { Link } from 'react-router-dom';
import arr from '../../../../assets/icons/arr.svg';
import axios from 'axios';
import { useState } from 'react';

const MainPageSearchCards = () => {
  const { baseUrl, listofCategories } = useContext(CustomContext);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    listofCategories[0] !== undefined &&
      axios
        .get(
          `/api/catalogs?filters[Slug][$eqi]=${listofCategories[0].SlugOfCategory}&filters[Slug][$eqi]=${listofCategories[1].SlugOfCategory}&filters[Slug][$eqi]=${listofCategories[2].SlugOfCategory}&filters[Slug][$eqi]=${listofCategories[3].SlugOfCategory}&filters[Slug][$eqi]=${listofCategories[4].SlugOfCategory}&filters[Slug][$eqi]=${listofCategories[5].SlugOfCategory}&populate=Icon`
        )
        .then(({ data }) => setCards(data.data));
  }, [listofCategories]);
  const showCatalogs = () => {
    return cards.map(({ Title, Slug, Icon }) => {
      return (
        <div className='mainPageSearchCards__card'>
          <div className='mainPageSearchCards__card__left'>
            <h2 className='mainPageSearchCards__card__left__title'>
              <Link to={Slug}>{Title}</Link>{' '}
            </h2>
            {/* <p className='mainPageSearchCards__card__left__quantity'>
            Количество товаров: {elem.quantity}
          </p> */}
            <div className='mainPageSearchCards__card__left__btn'>
              <Link to={Slug}>
                Подробнее{' '}
                <HandySvg src={arr} className='icon' width='6' height='9' />
              </Link>
            </div>
          </div>
          <div className='mainPageSearchCards__card__right'>
            <img src={`${baseUrl}${Icon.url}`} alt='img' />
          </div>
        </div>
      );
    });
  };

  return <div className='mainPageSearchCards'>{showCatalogs()}</div>;
};

export default MainPageSearchCards;
