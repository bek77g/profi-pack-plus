import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import MainPageAdvertise from './components/MainPageAdvertise/MainPageAdvertise';
import MainPagePopular from './components/MainPagePopular/MainPagePopular';
import MainPageSearch from './components/MainPageSearch/MainPageSearch';
import MainPageSearchSelect from './components/MainPageSearch/MainPageSearchSelect';

const MainPage = () => {
	const { MainPageData, baseUrl } = useContext(CustomContext);
	const sliderRef = useRef(null);
	const [slideSliceLength, setSlideSliceLength] = useState(6);
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const partnersArray = MainPageData?.partnersSlider?.Slide || [];

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	const { width } = useWindowDimensions();

	useEffect(() => {
		if (width <= 1200) setSlideSliceLength(5);
		if (width <= 960) setSlideSliceLength(4);
		if (width <= 760) setSlideSliceLength(3);
		if (width <= 520) setSlideSliceLength(2);
	}, [width]);

	return (
		<>
			<SEO
				SeoTitle={MainPageData?.mainPageSEO?.SeoTitle}
				SeoDescription={MainPageData?.mainPageSEO?.SeoDescription}
			/>
			<div className='mainPage'>
				<ul className='header__nav__bar mobile'>
					<li className='header__nav__bar__item header__nav__bar__item__prelast'>
						<Link to='/about'>О нас</Link>
					</li>
					<li className='header__nav__bar__item header__nav__bar__item__prelast'>
						<Link to='/partnership'>Сотрудничество</Link>
					</li>
					<li className='header__nav__bar__item header__nav__bar__item__prelast'>
						<Link to='/order'>Доставка</Link>
					</li>
					<li className='header__nav__bar__item header__nav__bar__item__prelast'>
						<Link to='/contacts'>Контакты</Link>
					</li>
					<li className='header__nav__bar__item header__nav__bar__item__prelast'>
						<Link to='/sale'>Акции</Link>
					</li>
				</ul>
				<MainPageSearchSelect />
				<MainPageAdvertise />
				<MainPageSearch />
				<MainPagePopular />
				<div className='mainPage__partners'>
					<h3 className='mainPage__partners-title'>
						Наши надежные партнеры для Ho•Re•Ca
					</h3>
					<div className='mainPage__partners-slider'>
						<Swiper
							autoplay={{ delay: 5000 }}
							ref={sliderRef}
							loop={true}
							slidesPerView={slideSliceLength}
							spaceBetween={20}
							modules={[Autoplay, Virtual]}
							pagination={true}>
							{partnersArray.map(({ Url, Img }) => {
								return (
									<SwiperSlide key={Url}>
										<div className='mainPage__partners-item'>
											<img
												width={'100%'}
												src={`${baseUrl}${Img.url}`}
												alt={Url}
											/>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
						{partnersArray.length > slideSliceLength && (
							<div className='mainPage__partners__nav'>
								<div
									className='mainPage__partners__nav-prevBtn'
									onClick={handlePrev}>
									<FaArrowCircleLeft size={30} color={'#1c62cd'} />
								</div>
								<div
									className='mainPage__partners__nav-nextBtn'
									onClick={handleNext}>
									<FaArrowCircleRight size={30} color={'#1c62cd'} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
