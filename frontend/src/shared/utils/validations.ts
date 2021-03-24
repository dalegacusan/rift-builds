import { BuildInterface, ItemInterface } from '../constants/interfaces';

export const VALIDATE = {
	HAS_ITEMS_SELECTED: (build: BuildInterface) =>
		build.itemsConfirmed.length !== 0,
	HAS_SIX_PRIMARY_ITEMS: (build: BuildInterface) =>
		build.itemsConfirmed.filter(
			(item: ItemInterface) => item.type === 'primary'
		).length === 6,
	HAS_USERNAME: (build: BuildInterface) => build.username,
	HAS_BUILD_TITLE: (build: BuildInterface) => build.buildTitle,
};
