export const clearSession = () => sessionStorage.clear();

export const getItemFromSession = (key: string) => {
	if (!sessionStorage) return;

	try {
		return sessionStorage.getItem(key);
	} catch (err) {
		console.error(`Something went wrong getting ${key}`);
	}
};

export const storeItem = (key: string, item: any) => {
	if (!sessionStorage) return;

	try {
		return sessionStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Something went wrong storing ${key}`);
	}
};

export const removeItemFromSession = (key: string) => {
	if (!sessionStorage) return;

	try {
		return sessionStorage.removeItem(key);
	} catch (err) {
		console.error(`Something went wrong removing ${key}`);
	}
};
