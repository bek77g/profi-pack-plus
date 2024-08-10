/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import slugify from 'slugify';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { useDebounce } from '../../../../hooks/useDebounce';

const MainPageSearchSelect = () => {
	const { catalogs, baseUrl } = useContext(CustomContext);
	const [searchParams, setSearchParamsData] = useState([]);
	const [searchSubcatalogsParams, setSearchSubcatalogsParamsData] = useState(
		[]
	);
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState();
	const [searchInputValue, setSearchInputValue] = useState();

	const debouncedInputSearchValue = useDebounce(searchInputValue, 1000);

	const defaultValues = catalogs.map(({ Title, Slug }) => {
		return { value: Slug, label: Title };
	});

	const setSearchParams = arr => {
		return arr.map(({ Title, Slug, sub_catalog }) => {
			let val = `${sub_catalog.catalog.Slug}/${sub_catalog.Slug}/${Slug}`;
			return { value: val, label: Title, type: 'catalog' };
		});
	};

	const setSearchSubcatalogsParams = arr => {
		return arr.map(({ catalog, Slug, Title }) => {
			let val = `${catalog.Slug}/${Slug}`;
			return { value: val, label: Title, type: 'subCatalog' };
		});
	};

	const loadOptions = (inputValue, callback) => {
		setTimeout(() => {
			const filteringSearch = setSearchParams(searchParams);
			const filteringSubCatalogsSearch = setSearchSubcatalogsParams(
				searchSubcatalogsParams
			);
			callback([
				...filteringSearch,
				...filteringSubCatalogsSearch,
				...defaultValues.filter(i =>
					i.label.toLowerCase().includes(inputValue.toLowerCase())
				),
			]);
		}, 1000);
	};

	const handleInputChange = newValue => {
		setSearchValue(newValue.value);
		return newValue;
	};

	const handleSearchSubmit = () => {
		if (searchValue !== undefined && searchValue.trim().length > 0)
			navigate(`/${searchValue}`);
	};

	useEffect(() => {
		if (debouncedInputSearchValue) {
			axios
				.get(
					`/api/products?filters[Slug][$containsi]=${debouncedInputSearchValue}&populate[Gallery][populate]=*&populate[sub_catalog][populate][0]=catalog`
				)
				.then(({ data }) => {
					setSearchParamsData(data.data);
				});
			axios
				.get(
					`/api/sub-catalogs?filters[Slug][$containsi]=${debouncedInputSearchValue}&populate[Icon][populate]=*&populate=catalog`
				)
				.then(({ data }) => {
					setSearchSubcatalogsParamsData(data.data);
				});
		}
	}, [debouncedInputSearchValue]);

	useEffect(() => {
		handleSearchSubmit();
	}, [searchValue]);

	// console.log(
	// 	searchSubcatalogsParams.find(catalog => catalog.Slug === 'grippery').Icon
	// 		.formats.small.url
	// );

	// console.log(
	// 	searchParams.find(
	// 		el => el.Slug === 'perchatki-rezinovye-5-zvezd-razmer-m-1-para'
	// 	).Gallery[0].formats.small.url
	// );

	const CustomOption = ({ innerProps, isDisabled, data, isFocused }) => {
		const splittedValue = data.value.split('/');
		const pureSlug = splittedValue[splittedValue.length - 1];
		const isProduct = splittedValue.length === 3;
		const existOption =
			splittedValue.length === 1
				? catalogs.find(catalog => catalog.Slug === pureSlug)
				: splittedValue.length === 2
				? searchSubcatalogsParams.find(catalog => catalog.Slug === pureSlug)
				: splittedValue.length === 3
				? searchParams.find(el => el.Slug === pureSlug)
				: null;
		const image =
			existOption && isProduct
				? existOption?.Gallery[0].formats.thumbnail.url
				: existOption && !isProduct
				? existOption?.Icon.url
				: '';

		return !isDisabled ? (
			<div
				{...innerProps}
				className={`mainPageSearchSelect__option ${
					isFocused ? 'focused' : ''
				}`}>
				<div className='mainPageSearchSelect__option-left'>
					{image && <img src={`${baseUrl}${image}`} />}
					{data.label}
				</div>
				{isProduct && existOption && (
					<div className='mainPageSearchSelect__option-right'>
						<p>
							{existOption.Price && existOption.CountType
								? `${existOption.Price} сом/${existOption.CountType}`
								: null}
						</p>
					</div>
				)}
			</div>
		) : null;
	};

	return (
		<div className='mainPageSearchSelect'>
			<AsyncSelect
				cacheOptions
				loadOptions={loadOptions}
				defaultOptions={defaultValues}
				onInputChange={e => setSearchInputValue(slugify(e))}
				placeholder='Поиск товара'
				onChange={handleInputChange}
				noOptionsMessage={() => 'Не найдено, проверьте написание товара'}
				components={{ Option: CustomOption }}
			/>
			{/* <button
        disabled={!!searchValue}
        className='mainPageSearchSelect-btn'
        onClick={() => handleSearchSubmit()}>
        Search
      </button> */}
		</div>
	);
};

export default MainPageSearchSelect;
