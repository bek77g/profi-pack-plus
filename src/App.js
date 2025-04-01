import React, { Suspense, useContext } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import AuthModal from './components/auth/AuthModal';
import MainLayout from './components/MainLayout';
import { CustomContext } from './hoc/mainContentContext';
import PageLoading from './layout/loading/PageLoading';
import './scss/style.scss';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CatalogPageProducts = React.lazy(() =>
	import(
		'./pages/CatalogPage/components/CatalogPageProducts/CatalogPageProducts'
	)
);
const CatalogFullPage = React.lazy(() => import('./pages/CatalogPage/CatalogFullPage'));
const PartnershipPage = React.lazy(() =>
	import('./pages/PartnershipPage/PartnershipPage')
);
const CartPage = React.lazy(() => import('./pages/CartPage/CartPage'));
const FavouritePage = React.lazy(() =>
	import('./pages/FavouritePage/FavouritePage')
);
const SubCategoryPage = React.lazy(() =>
	import('./pages/SubCategoryPage/SubCategoryPage')
);
const SubCategoryPageCards = React.lazy(() =>
	import('./pages/SubCategoryPage/components/SubCategoryPageCards')
);
const NotFounf = React.lazy(() => import('./pages/NotFound/NotFounf'));

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const OrderPage = React.lazy(() => import('./pages/OrderPage/OrderPage'));
const ContactsPage = React.lazy(() =>
	import('./pages/ContactsPage/ContactsPage')
);

// Profile Pages
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const PersonalDataPage = React.lazy(() => import('./pages/ProfilePage/PersonalDataPage'));
const OrderHistory = React.lazy(() => import('./pages/ProfilePage/OrderHistory'));

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{ path: '/', element: <MainPage /> },
			{ path: '/:catalog', element: <SubCategoryPage /> },
			{ path: '/:catalog/:subCatalog', element: <CatalogPage /> },
			{
				path: '/:catalog/:subCatalog/:product',
				element: <CatalogPageProducts />,
			},
			{
				path: '/catalog',
				element: <CatalogFullPage />,
			},
			{
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: '/partnership',
				element: <PartnershipPage />,
			},
			{
				path: '/order',
				element: <OrderPage />,
			},
			{
				path: '/contacts',
				element: <ContactsPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/favourite',
				element: <FavouritePage />,
			},
			{
				path: '/profile',
				element: <ProfilePage />,
			},
			{
				path: '/profile/personal',
				element: <PersonalDataPage />,
			},
			{
				path: '/profile/orders',
				element: <OrderHistory />,
			},
			{
				path: '/cards',
				element: <SubCategoryPageCards />,
			},
			{
				path: '*',
				element: <NotFounf />,
			},
		],
	},
]);

function App() {
	const { authModalOpen, setAuthModalOpen } = useContext(CustomContext);

	return (
		<>
			<Suspense fallback={<PageLoading />}>
				<RouterProvider router={router} />
			</Suspense>
			<AuthModal
				isOpen={authModalOpen}
				onClose={() => setAuthModalOpen(false)}
			/>
		</>
	);
}

export default App;
