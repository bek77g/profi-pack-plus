import toast from 'react-hot-toast';

export const limitCount = (currentCount, Count) => {
	if (currentCount => Count) {
		toast.error('Превышено количество товара');
	}
	return currentCount;
};

export const pagesHandler = (array, page_size, page_number) => {
	return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export const favsProduct = (obj, favorite = []) => {
	if (favorite.length === 0) return obj;
	let existingObj = favorite.find(favItem => favItem.id === obj.id);
	if (obj.favorite) obj.favorite = false;
	if (existingObj) obj.favorite = true;
	return obj;
};
