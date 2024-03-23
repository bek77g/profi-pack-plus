import DG from '2gis-maps';
import { HandySvg } from 'handy-svg';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import email from '../../assets/icons/email.svg';
import work from '../../assets/icons/work.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';

import logo from '../../assets/favicon.ico';

const ContactsPage = () => {
	const { ContactPageData } = useContext(CustomContext);
	const { Phones, Address, WorkSchedule, Mail, ContactPageSEO } =
		ContactPageData;

	useEffect(() => {
		let map;
		map = DG.map('map-container', {
			center: [42.860571, 74.595926],
			zoom: 17,
		});

		const icon = DG.icon({
			iconUrl: logo,
			iconSize: [30, 30],
			borderRadius: '100%',
		});

		DG.marker([42.860571, 74.595926], { icon, title: 'ProfiPackPlus' })
			.addTo(map)
			.bindPopup('ProfiPackPlus');
	}, []);

	return (
		<>
			<SEO
				SeoTitle={ContactPageSEO?.SeoTitle || 'ProfiPackPlus - Контакты'}
				SeoDescription={
					ContactPageSEO?.SeoDescription || 'Наши контакты и Адрес'
				}
			/>
			<div className='contacts'>
				<div className='contacts__top'>
					<Link to='/'>
						Главная{' '}
						<span>
							<HandySvg src={arr} width='6' height='9' />
						</span>
					</Link>
					<span>Контакты</span>
				</div>
				<div className='row'>
					<div className='col'>
						<div className='contacts__content__left'>
							<div className='contacts__content__left__title'>
								<span>Интернет-магазин «ProfiPackPlus»</span>
							</div>
							<div className='contacts__content__left__call'>
								<span>Позвоните нам</span>
							</div>
							<div className='contacts__content__left__info'>
								<div className='contacts__content__left__phone mb-4'>
									<svg
										width='23'
										height='25'
										viewBox='0 0 15 15'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M4.71922 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V4.5C0.5 10.0228 4.97715 14.5 10.5 14.5H12.5C13.6046 14.5 14.5 13.6046 14.5 12.5V11.118C14.5 10.7393 14.286 10.393 13.9472 10.2236L11.5313 9.01564C10.987 8.74349 10.3278 9.01652 10.1354 9.59384L9.83762 10.4871C9.64474 11.0658 9.05118 11.4102 8.45309 11.2906C6.05929 10.8119 4.18814 8.94071 3.70938 6.54691C3.58976 5.94882 3.93422 5.35526 4.51286 5.16238L5.62149 4.79284C6.11721 4.6276 6.40214 4.10855 6.2754 3.60162L5.68937 1.25746C5.57807 0.812297 5.17809 0.5 4.71922 0.5Z'
											stroke='#1C62CD'
										/>
									</svg>
									<div className='contacts__content__left__info__phones'>
										{Phones?.map(({ Phone, Title }) => (
											<span>
												<a href={`tel:${Phone}`}>
													{Phone} {!!Title && ` - ${Title}`}
												</a>
											</span>
										))}
									</div>
								</div>
								<div className='contacts__content__left__address mb-4'>
									<svg
										width='23'
										height='25'
										viewBox='0 0 13 15'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M6.5 8.49478C7.604 8.49478 8.5 7.59934 8.5 6.49606C8.5 5.39278 7.604 4.49738 6.5 4.49738C5.396 4.49738 4.5 5.39278 4.5 6.49606C4.5 7.59934 5.396 8.49478 6.5 8.49478Z'
											stroke='#1C62CD'
											strokeLinecap='square'
										/>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M12.5 6.49606C12.5 11.4928 7.5 14.4909 6.5 14.4909C5.5 14.4909 0.5 11.4928 0.5 6.49606C0.5 3.18522 3.187 0.5 6.5 0.5C9.813 0.5 12.5 3.18522 12.5 6.49606Z'
											stroke='#1C62CD'
											strokeLinecap='square'
										/>
									</svg>
									<span>{Address}</span>
								</div>
								<div className='contacts__content__left__mail mb-4'>
									<HandySvg src={work} width='23' height='25' />
									<span>{WorkSchedule}</span>
								</div>
								<div className='contacts__content__left__work mb-4'>
									<HandySvg src={email} width='23' height='25' />
									<span>
										<a href={`mail:${Mail}`}>{Mail}</a>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col'>
						<div className='contacts__content__right'>
							<div
								id='map-container'
								className='contacts__content__right__map'
								style={{ width: '100%', height: '100%' }}></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactsPage;
