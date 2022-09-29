import React from 'react';
import Select from 'react-select';
import search from '../../../../components/constants';

const MainPageSearchSelect = () => {
  const options = search.map((item) => {
    return { value: item.name, label: item.name };
  });

  return (
    <div className='mainPageSearchSelect'>
      <Select options={options} placeholder='Поиск товара' />
    </div>
  );
};

export default MainPageSearchSelect;
