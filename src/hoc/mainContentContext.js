import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CustomContext = createContext();
export const MainContentContext = (props) => {
  const baseUrl = 'http://localhost:1337';
  axios.defaults.baseURL = baseUrl;

  const [catalogs, setCatalogs] = useState([]);

  const [mainPageSEO, setMainPageSEO] = useState({});
  const [discount, setDiscount] = useState([
    {
      title: 'Продукт со скидкой',
      url: 'url',
      priceBefore: 3424,
      currentPrice: 234234,
      discountPeriod: '2022-10-18',
      img: {
        url: 'https://via.placeholder.com/128x90.png?text=ProfiPackPlus+slide+of+slider',
      },
    },
  ]);
  const [discountGallery, setDiscountGallery] = useState([
    {
      Slide: [
        {
          Url: 'url',
          Img: {
            url: 'https://via.placeholder.com/128x90.png?text=ProfiPackPlus+discount+product',
          },
        },
      ],
    },
  ]);
  const [listofCategories, setListofCategories] = useState([]);

  function getCatalogs() {
    axios
      .get(
        '/api/catalogs?populate[sub_catalogs][populate][0]=Icon&populate=Icon'
      )
      .then(({ data }) => setCatalogs(data.data));
  }
  function getMainPageData() {
    axios.get('/api/main-page?populate=deep').then(({ data }) => {
      setDiscountGallery(data.data.MainPageSlider);
      setDiscount(data.data.MainPageDiscount);
      setListofCategories(data.data.ListOfCategories);
      setMainPageSEO(data.data.MainPageSEO);
    });
  }

  useEffect(() => {
    getCatalogs();
    getMainPageData();
  }, []);

  const value = {
    baseUrl,
    catalogs,
    discount,
    discountGallery,
    listofCategories,
    mainPageSEO,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
