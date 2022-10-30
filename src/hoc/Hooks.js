import toast from 'react-hot-toast';

export const limitCount = (currentCount, Count) => {
  if ((currentCount) => Count) {
    toast.error('Превышено количество товара');
  }
  return currentCount;
};

export const pagesHandler = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export const favsProduct = (obj) => {
  if (!localStorage.getItem('favorites')) return obj;
  let existingObj = JSON.parse(localStorage.getItem('favorites')).find(
    (favItem) => favItem.id === obj.id
  );
  if (obj.favorite) obj.favorite = false;
  if (existingObj) obj.favorite = true;
  return obj;
};
