import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageSearchSelect = () => {
  const { searchParams, catalogs } = useContext(CustomContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState();

  const defaultValues = catalogs.map(({ Title, Slug }) => {
    return { value: Slug, label: Title };
  });

  const setSearchParams = (arr) => {
    return arr.map(({ Title, Slug, sub_catalog }) => {
      let val = `${sub_catalog.catalog.Slug}/${sub_catalog.Slug}/${Slug}`;
      return { value: val, label: Title };
    });
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteringSearch = setSearchParams(searchParams).filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteringSearch);
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
    handleSearchSubmit();
  }, [searchValue]);

  return (
    <div className='mainPageSearchSelect'>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={defaultValues}
        placeholder='Поиск товара'
        onChange={handleInputChange}
      />
      <button
        disabled={!!searchValue}
        className='mainPageSearchSelect-btn'
        onClick={() => handleSearchSubmit()}>
        Search
      </button>
    </div>
  );
};

export default MainPageSearchSelect;
