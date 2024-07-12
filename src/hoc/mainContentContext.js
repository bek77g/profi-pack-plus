import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CustomContext = createContext();
export const MainContentContext = props => {
	const baseUrl = 'https://app.profipack.kg';
	// const baseUrl = 'http://localhost:1337';
	axios.defaults.baseURL = baseUrl;
	axios.defaults.headers.common = {
		Authorization: `Bearer ${process.env.REACT_APP_JWT_SECRET_KEY}`,
	};
	const [catalogs, setCatalogs] = useState([]);
	const [nav, setNav] = useState(false);

	const [cart, setCart] = useState([]);
	const [favorite, setFavorite] = useState([]);
	let localCart = localStorage.getItem('cart');
	let localFav = localStorage.getItem('favorites');

	const [shippingPrice, setShippingPrice] = useState(0);

	const [isCheckout, setIsCheckout] = useState(false);

	//Pages data start
	const [MainPageData, setMainPageData] = useState({
		discount: {
			img: {
				url: 'https://via.placeholder.com/128x90.png?text=ProfiPackPlus+slide+of+slider',
			},
		},
		discountGallery: {
			Slide: [
				{
					Url: 'url',
					Img: {
						url: 'https://via.placeholder.com/128x90.png?text=ProfiPackPlus+discount+product',
					},
				},
			],
		},
		listofCategories: [],
	});
	const [AboutPageData, setAboutPageData] = useState({});
	const [PartnerPageData, setPartnerPageData] = useState({});
	const [OrderPageData, setOrderPageData] = useState({});
	const [ContactPageData, setContactPageData] = useState({});
	//Pages data end

	//Get pages data start
	function getMainPageData() {
		axios
			.get('/api/main-page?populate=deep')
			.then(({ data }) => data.data)
			.then(
				({
					MainPageDiscount,
					MainPageSlider,
					ListOfCategories,
					MainPageSEO,
					PartnersSlider,
				}) =>
					setMainPageData({
						discount: MainPageDiscount,
						discountGallery: MainPageSlider,
						listofCategories: ListOfCategories,
						mainPageSEO: MainPageSEO,
						partnersSlider: PartnersSlider,
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
			.then(({ Phones, Address, WorkSchedule, Mail, ContactPageSEO }) =>
				setContactPageData({
					Phones,
					Address,
					WorkSchedule,
					Mail,
					ContactPageSEO,
				})
			);
	}
	//Get pages data end

	useEffect(() => {
		getMainPageData();
		getAboutPageData();
		getPartnerPageData();
		getOrderPageData();
		getContactPageData();
		let prev_cart = JSON.parse(localStorage.getItem('cart')) || [];
		setCart(prev_cart);
	}, []);

	const addFav = favObj => {
		let favCopy = [...favorite];
		let { id } = favObj;
		let existingObj = favCopy.find(favItem => favItem.id === id);
		if (existingObj) {
			favCopy = favCopy.filter(favItem => favItem.id != favObj.id);
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
		let existingCart = cartCopy.find(cartItem => cartItem.id === id);
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
		let existentItem = cartCopy.find(item => item.id == cartID);
		if (!existentItem) return;
		existentItem.quantity = amount;
		if (existentItem.quantity <= 0) {
			cartCopy = cartCopy.filter(item => item.id != cartID);
		}
		setCart(cartCopy);
		localStorage.setItem('cart', JSON.stringify(cartCopy));
	};
	const removeCart = cartID => {
		let cartCopy = [...cart];
		cartCopy = cartCopy.filter(item => item.id != cartID);
		setCart(cartCopy);
		let cartString = JSON.stringify(cartCopy);
		localStorage.setItem('cart', cartString);
	};
	const resetCart = () => {
		setCart([]);
		localStorage.removeItem('cart');
	};

	useEffect(() => {
		localCart = JSON.parse(localCart);
		localFav = JSON.parse(localFav);
		if (localCart) setCart(localCart);
		if (localFav) setFavorite(localFav);
	}, []);

	const value = {
		baseUrl,
		nav,
		catalogs,
		setCatalogs,
		setNav,
		shippingPrice,
		isCheckout,
		setIsCheckout,
		addFav,
		favorite,
		addCart,
		editCart,
		removeCart,
		resetCart,
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
