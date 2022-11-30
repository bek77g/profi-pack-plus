import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CustomContext = createContext();
export const MainContentContext = (props) => {
  const baseUrl = 'http://app.profipack.kg';
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common = {
    Authorization: `Bearer ${process.env.REACT_APP_JWT_SECRET_KEY}`,
  };

  const [nav, setNav] = useState(false);

  const [catalogs, setCatalogs] = useState([]);
  const [searchParams, setSearchParams] = useState([]);

  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);
  let localCart = localStorage.getItem('cart');
  let localFav = localStorage.getItem('favorites');

  const [shippingPrice, setShippingPrice] = useState(0);

  //Pages data start
  const [MainPageData, setMainPageData] = useState({
    discount: [
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
    ],
    discountGallery: [
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
    ],
    listofCategories: [],
  });
  const [AboutPageData, setAboutPageData] = useState({});
  const [PartnerPageData, setPartnerPageData] = useState({});
  const [OrderPageData, setOrderPageData] = useState({});
  const [ContactPageData, setContactPageData] = useState({});
  //Pages data end

  //Get pages data start
  function getCatalogs() {
    axios
      .get(
        '/api/catalogs?populate=deep'
        // '/api/catalogs?populate[sub_catalogs][populate]=products&populate=Icon'
      )
      .then(({ data }) => {
        setCatalogs(data.data);
        setSearchParams(
          data.data
            .reduce(
              (acc, rec) =>
                acc.concat(rec.sub_catalogs.map((el) => el.products)),
              []
            )
            .flat()
        );
      });
  }
  function getMainPageData() {
    axios
      .get('/api/main-page?populate=deep')
      .then(({ data }) => data.data)
      .then(
        ({ MainPageDiscount, MainPageSlider, ListOfCategories, MainPageSEO }) =>
          setMainPageData({
            discount: MainPageDiscount,
            discountGallery: MainPageSlider,
            listofCategories: ListOfCategories,
            mainPageSEO: MainPageSEO,
          })
      );
  }
  function getAboutPageData() {
    axios
      .get('/api/about-us-page?populate=deep')
      .then(({ data }) => data.data)
      .then(({ AboutCompany, OurCapabilities, AboutPageSEO }) =>
        setAboutPageData({
          AboutCompany,
          OurCapabilities,
          AboutPageSEO,
        })
      );
  }
  function getPartnerPageData() {
    axios
      .get('/api/partner-info-page?populate=deep')
      .then(({ data }) => data.data)
      .then(({ Info, PartnerPageSEO }) =>
        setPartnerPageData({
          Info,
          PartnerPageSEO,
        })
      );
  }
  function getOrderPageData() {
    axios
      .get('/api/order-page?populate=deep')
      .then(({ data }) => data.data)
      .then(({ OrderPageSEO, PickupInfo, PaymentInfo, PaymentPrice }) => {
        setOrderPageData({
          OrderPageSEO,
          PickupInfo,
          PaymentInfo,
        });
        setShippingPrice(PaymentPrice);
      });
  }
  function getContactPageData() {
    axios
      .get('/api/contact-page?populate=deep')
      .then(({ data }) => data.data)
      .then(({ Phone, Address, WorkSchedule, Mail, ContactPageSEO }) =>
        setContactPageData({
          Phone,
          Address,
          WorkSchedule,
          Mail,
          ContactPageSEO,
        })
      );
  }
  //Get pages data end

  const getPagesData = () => {
    getCatalogs();
    getMainPageData();
    getAboutPageData();
    getPartnerPageData();
    getOrderPageData();
    getContactPageData();
  };

  useEffect(() => {
    getPagesData();
    let prev_cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(prev_cart);
  }, []);

  const addFav = (favObj) => {
    let favCopy = [...favorite];
    let { id } = favObj;
    let existingObj = favCopy.find((favItem) => favItem.id === id);
    if (existingObj) {
      favCopy = favCopy.filter((favItem) => favItem.id != favObj.id);
    } else {
      favObj.favorite = true;
      favCopy.push(favObj);
    }
    setFavorite(favCopy);
    localStorage.setItem('favorites', JSON.stringify(favCopy));
  };

  const addCart = (cartObj, quantity) => {
    let cartCopy = [...cart];
    let { id } = cartObj;
    let existingCart = cartCopy.find((cartItem) => cartItem.id === id);
    if (existingCart) {
      existingCart.quantity += quantity;
    } else {
      cartObj.quantity = quantity;
      cartCopy.push(cartObj);
    }
    setCart(cartCopy);
    localStorage.setItem('cart', JSON.stringify(cartCopy));
  };
  const editCart = (cartID, amount) => {
    let cartCopy = [...cart];
    let existentItem = cartCopy.find((item) => item.id == cartID);
    if (!existentItem) return;
    existentItem.quantity = amount;
    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter((item) => item.id != cartID);
    }
    setCart(cartCopy);
    localStorage.setItem('cart', JSON.stringify(cartCopy));
  };
  const removeCart = (cartID) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id != cartID);
    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  };

  useEffect(() => {
    localCart = JSON.parse(localCart);
    localFav = JSON.parse(localFav);
    if (localCart) setCart(localCart);
    if (localFav) setFavorite(localFav);
  }, []);

  const value = {
    baseUrl,
    catalogs,
    searchParams,
    nav,
    setNav,
    shippingPrice,
    addFav,
    favorite,
    addCart,
    editCart,
    removeCart,
    cart,
    MainPageData,
    AboutPageData,
    PartnerPageData,
    OrderPageData,
    ContactPageData,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
