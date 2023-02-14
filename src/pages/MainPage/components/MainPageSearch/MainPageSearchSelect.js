import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import slugify from 'slugify';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { useDebounce } from '../../../../hooks/useDebounce';

const MainPageSearchSelect = () => {
  const { catalogs } = useContext(CustomContext);
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

  const setSearchParams = (arr) => {
    return arr.map(({ Title, Slug, sub_catalog }) => {
      let val = `${sub_catalog.catalog.Slug}/${sub_catalog.Slug}/${Slug}`;
      return { value: val, label: Title };
    });
  };

  const setSearchSubcatalogsParams = (arr) => {
    return arr.map(({ catalog, Slug, Title }) => {
      let val = `${catalog.Slug}/${Slug}`;
      return { value: val, label: Title };
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
        ...defaultValues.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        ),
      ]);
    }, 1000);
  };

  const handleInputChange = (newValue) => {
    setSearchValue(newValue.value);
    return newValue;
  };

  const handleSearchSubmit = () => {
    if (searchValue !== undefined && searchValue.trim().length > 0)
      navigate(`${searchValue}`);
  };

  useEffect(() => {
    if (debouncedInputSearchValue) {
      axios
        .get(
          `/api/products?filters[Slug][$containsi]=${debouncedInputSearchValue}&populate[sub_catalog][populate][0]=catalog`
        )
        .then(({ data }) => {
          setSearchParamsData(data.data);
        });
      axios
        .get(
          `/api/sub-catalogs?filters[Slug][$containsi]=${debouncedInputSearchValue}&populate=catalog`
        )
        .then(({ data }) => {
          setSearchSubcatalogsParamsData(data.data);
        });
    }
  }, [debouncedInputSearchValue]);

  useEffect(() => {
    handleSearchSubmit();
  }, [searchValue]);

  return (
    <div className='mainPageSearchSelect'>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={defaultValues}
        onInputChange={(e) => setSearchInputValue(slugify(e))}
        placeholder='Поиск товара'
        onChange={handleInputChange}
        noOptionsMessage={() => 'Не найдено, проверьте написание товара'}
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
