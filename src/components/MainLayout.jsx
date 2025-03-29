import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Header = React.lazy(() => import('../layout/header/Header'));
const Footer = React.lazy(() => import('../layout/footer/Footer'));
const SideBarPage = React.lazy(() => import('../pages/SideBarPage'));
const BottomMenu = React.lazy(() => import('../layout/bottom-menu/BottomMenu'));

const MainLayout = () => {
	return (
		<>
			<SideBarPage />
			<div className='container'>
				<div className='pageContent__view'>
					<Header />
					<Outlet />
					<Footer />
				</div>
			</div>
			<BottomMenu />
			<ScrollRestoration
				getKey={(location, matches) => {
					return location.pathname;
				}}
			/>
			{Toaster}
		</>
	);
};

export default MainLayout;
