import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CustomContext = createContext();
export const MainContentContext = props => {
	const baseUrl = 'https://app.profipack.kg';
	// const baseUrl = 'http://localhost:1337';
	axios.defaults.baseURL = baseUrl;

	const [user, setUser] = useState(null);
	const [authModalOpen, setAuthModalOpen] = useState(false);
	const [catalogs, setCatalogs] = useState([]);
	const [nav, setNav] = useState(false);

	const [cart, setCart] = useState([]);
	const [favorite, setFavorite] = useState([]);

	const [shippingPrice, setShippingPrice] = useState(0);
	const [isCheckout, setIsCheckout] = useState(false);

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

	// Initialize auth state from localStorage
	useEffect(() => {
		const token = localStorage.getItem('jwt');
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			// Fetch user profile
			axios
				.get('/api/profile')
				.then(({ data }) => setUser(data))
				.catch(() => {
					localStorage.removeItem('jwt');
					delete axios.defaults.headers.common['Authorization'];
				});
		}
	}, [authModalOpen]);

	// Fetch cart and favorites when user is authenticated
	useEffect(() => {
		if (user) {
			// Fetch cart
			axios
				.get('/api/cart')
				.then(({ data }) => setCart(data.items || []))
				.catch(console.error);

			// Fetch favorites
			axios
				.get('/api/favorites')
				.then(({ data }) => setFavorite(data.products || []))
				.catch(console.error);
		}
	}, [user]);

	const logout = () => {
		localStorage.removeItem('jwt');
		delete axios.defaults.headers.common['Authorization'];
		setUser(null);
		setCart([]);
		setFavorite([]);
	};

	const requireAuth = callback => {
		if (!user) {
			setAuthModalOpen(true);
			return false;
		}
		return callback();
	};

	const addCart = (cartObj, quantity = 1) => {
		return requireAuth(() => {
			return axios
				.post('/api/cart/add', { id: cartObj.id, quantity })
				.then(({ data }) => {
					setCart(data.items);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

	const editCart = (cartID, amount) => {
		return requireAuth(() => {
			return axios
				.put(`/api/cart/items/${cartID}`, { quantity: amount })
				.then(({ data }) => {
					setCart(data.items);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

	const removeCart = cartID => {
		return requireAuth(() => {
			return axios
				.delete(`/api/cart/items/${cartID}`)
				.then(({ data }) => {
					setCart(data.items);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

	const resetCart = () => {
		return requireAuth(() => {
			return axios
				.delete('/api/cart/clear')
				.then(() => {
					setCart([]);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

	const addFav = product => {
		return requireAuth(() => {
			return axios
				.post('/api/favorites/add', { id: product.id })
				.then(({ data }) => {
					setFavorite(data.products);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

	const removeFavorite = productId => {
		return requireAuth(() => {
			return axios
				.delete(`/api/favorites/${productId}`)
				.then(({ data }) => {
					setFavorite(data.products);
					return true;
				})
				.catch(error => {
					console.error(error);
					return false;
				});
		});
	};

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
	}, []);

	const value = {
		catalogs,
		setCatalogs,
		baseUrl,
		nav,
		setNav,
		cart,
		favorite,
		addCart,
		removeCart,
		resetCart,
		editCart,
		addFav,
		removeFavorite,
		MainPageData,
		AboutPageData,
		PartnerPageData,
		OrderPageData,
		ContactPageData,
		shippingPrice,
		setShippingPrice,
		isCheckout,
		setIsCheckout,
		user,
		setUser,
		logout,
		authModalOpen,
		setAuthModalOpen,
	};

	return (
		<CustomContext.Provider value={value}>
			{props.children}
		</CustomContext.Provider>
	);
};
