import { useState } from 'react';

function getSearchParam(search, param) {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(param);
}

function setSearchParam(search, param, value) {
  const searchParams = new URLSearchParams(search);
  searchParams.set(param, value);
  return searchParams.toString();
}

const defaultDeserialize = function (v) {
  return v;
};

const defaultSerialize = function (value) {
  return String(value);
};

export function useSearchParamsState(
  name,
  {
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    defaultValue,
  }
) {
  const [value, setValue] = useState(() => {
    const initialValue = deserialize(
      getSearchParam(window.location.search, name)
    );
    return initialValue !== null ? initialValue : defaultValue; // Use the default value if the parameter is not present
  });

  const updateValue = function (newValue) {
    const search = window.location.search;
    const actualNewValue =
      typeof newValue === 'function' ? newValue(value) : newValue;

    setValue(actualNewValue);

    const newSearch = setSearchParam(search, name, serialize(actualNewValue));
    window.history.pushState(null, '', `?${newSearch}`);
  };

  return [value, updateValue];
}
