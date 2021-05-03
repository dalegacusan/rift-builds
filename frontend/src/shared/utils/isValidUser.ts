import { UserInterface } from '../interfaces/GlobalStore';

export const isValidUser = (user: any) => {
	if (user && Object.keys(user).length) {
		return true;
	}
	return false;
};
