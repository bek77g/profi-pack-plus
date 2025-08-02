import { HandySvg } from 'handy-svg';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import arr from '../../../assets/icons/arr.svg';
import cart from '../../../assets/icons/cart.svg';
import heart from '../../../assets/icons/favourite.svg';
import secondCatalog from '../../../components/constants/secondCatalog';
import PaginationComp from '../../../components/Pagination';

const Products = props => {
	const [count, setCount] = useState(1);

	const addToCart = () => {
		toast.success('Товар добавлен в корзину');
	};

	return (
		<div className='mainPagePopular__catalog__cards__card'>
			{props.data.New && (
				<div className='mainPagePopular__catalog__cards__card__new'>
					Новинка
				</div>
			)}
			{props.data.BestSeller && (
				<div className='mainPagePopular__catalog__cards__card__hit'>Хит</div>
			)}
			<div className='mainPagePopular__catalog__cards__card__heart'>
				<p className='icon'>
					<p>
						<HandySvg width='24' height='24' src={heart} />
					</p>
				</p>
			</div>
			<div className='mainPagePopular__catalog__cards__card__img'>
				<Link to='/products'>
					<img
						className='d-block w-100'
						src={props.data.img}
						alt='First slide'
					/>
				</Link>
			</div>
			<div className='mainPagePopular__catalog__cards__card__descr'>
				<Link to='/products'>
					<h5>{props.data.description}</h5>
				</Link>
				<div className='mainPagePopular__catalog__cards__card__cart'>
					<Link to='/products'>
						<p>{props.data.price}</p>
					</Link>
					<button
						onClick={() => addToCart()}
						disabled={!props.data.Availability}>
						<HandySvg src={cart} className='icon' width='30' height='30' />
					</button>
				</div>
				<div
					className={`catalogPagePopular__catalogs__cards__card__availability catalogPagePopular__catalogs__cards__card__availability--${
						props.data.Availability ? 'stock' : 'nonstock'
					}`}>
					{props.data.Availability ? 'В наличии' : 'Нет в наличии'}
				</div>
				<div className='catalogPagePopular__catalogs__cards__card__quantity'>
					<button
						type='button'
						className='btn btn-info'
						onClick={() => setCount(count - 1)}>
						-
					</button>
					<input
						type='text'
						onKeyPress={e => !/[0-9]/.test(e.key) && e.preventDefault()}
						onChange={e => {
							let num = +e.target.value;
							setCount(num);
						}}
						className='form-control form-control-color'
						value={count}
						readOnly
					/>
					<button
						type='button'
						className='btn btn-info'
						onClick={() => setCount(count + 1)}>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

const SubCategoryPageCards = () => {
	const newCatalog = secondCatalog.map(elem => <Products data={elem} />);

	return (
		<div className='subCategoryPageCards'>
			<div className='catalogPage'>
				<div className='catalogPage__top'>
					<span>
						Главная <img src={arr} alt='' />
					</span>
					<span>Каталог</span>
					<h2>Каталог</h2>
				</div>
				<div className='catalogPage__mid'>
					<div></div>
					<div className='catalogPage__mid__select'>
						<select name='' id=''>
							<option value='1'>По популярности</option>
							<option value='1'>По цене</option>
							<option value='1'>По дате</option>
						</select>
					</div>
				</div>
				<div className='catalogPage__content'>
					<div className='catalogPage__content__left'>
						<span>Параметры</span>
						<div className='catalogPage__content__left__price'>
							<Form.Label>Цена</Form.Label>
							<Form.Range />
							от 100.000 до 500.000
						</div>
					</div>
					<div className='catalogPage__content__right'>
						<div className='catalogPagePopular__catalogs__cards'>
							{newCatalog}
						</div>
						<PaginationComp />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubCategoryPageCards;
