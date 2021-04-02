import {
	BuildInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from '../constants/interfaces';
import { ItemType } from '../constants/constants';
import { Validation } from '../constants/validation';
import { ERROR } from '../utils/messages';

// === START: Global Functions === //
const resultHandler = (message: string | null, result: boolean) => {
	return {
		message,
		result,
	};
};

const isValidString = (text: string) => {
	return typeof text === 'string';
};

const isValidReasonAndType = (objectToCheck: RuneInterface | ItemInterface) => {
	const { reason } = objectToCheck;

	// If there's a reason property, check if it's the right type
	// and right length
	// This will always return true if it doesn't fail any of the
	// two conditions
	if (reason) {
		const isValidType = isValidString(reason);
		const isValidLength =
			reason.length >= Validation.REASON.MIN_LENGTH &&
			reason.length <= Validation.REASON.MAX_LENGTH;

		if (!(isValidType && isValidLength)) return false;
	}

	return true;
};
// === END: Global Functions === //

const HAS_BUILD_TITLE = (build: BuildInterface) => {
	if (build.buildTitle) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NO_BUILD_TITLE, false);
};

const HAS_ITEMS_SELECTED = (build: BuildInterface) => {
	if (build.itemsConfirmed.length !== 0) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NO_ITEMS_SELECTED, false);
};

const HAS_THREE_TO_SIX_PRIMARY_ITEMS = (build: BuildInterface) => {
	const lengthOfPrimaryItems = build.itemsConfirmed.filter(
		(item: ItemInterface) => item.type === 'primary'
	).length;

	const hasThreeToSixPrimaryItems =
		lengthOfPrimaryItems >= Validation.ITEMS.PRIMARY.MIN_LENGTH &&
		lengthOfPrimaryItems <= Validation.ITEMS.PRIMARY.MAX_LENGTH;

	if (hasThreeToSixPrimaryItems) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.DOES_NOT_HAVE_THREE_TO_SIX_PRIMARY_ITEMS, false);
};

const HAS_USERNAME = (build: BuildInterface) => {
	if (build.username) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NO_USERNAME, false);
};

const IS_VALID_BUILD_TITLE = (build: BuildInterface) => {
	const { buildTitle } = build;

	const isTypeString = isValidString(buildTitle);
	const isValidLength =
		buildTitle.length >= Validation.BUILD_TITLE.MIN_LENGTH &&
		buildTitle.length <= Validation.BUILD_TITLE.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_BUILD_TITLE, false);
};

const IS_VALID_USERNAME = (build: BuildInterface) => {
	const { username } = build;

	const isTypeString = isValidString(username);
	const isValidLength =
		username.length >= Validation.USERNAME.MIN_LENGTH &&
		username.length <= Validation.USERNAME.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_USERNAME, false);
};

const IS_VALID_ROLE = (build: BuildInterface, roles: Array<RoleInterface>) => {
	const { buildRole } = build;

	// Checks if buildRole.id and buildRole.roleName has a corresponding object to roles
	const isValidRole =
		roles.filter((role) => {
			const { id, roleName } = role;

			return id === buildRole.id && roleName === buildRole.roleName;
		}).length === 1;

	if (isValidRole) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_ROLE, false);
};

const IS_VALID_CHAMPION = (
	build: BuildInterface,
	champions: Array<ChampionInterface>
) => {
	const { champion: buildChampion } = build;

	const isValidChampion =
		champions.filter((champion) => {
			// Checks if both objects have same properties and corresponding values
			// THE ORDER OF PROPERTIES IS IMPORTANT
			// Source: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

			return JSON.stringify(buildChampion) === JSON.stringify(champion);
		}).length === 1;

	if (isValidChampion) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_CHAMPION, false);
};

const IS_VALID_ITEMS_SELECTED = (
	build: BuildInterface,
	items: Array<ItemInterface>
) => {
	const { itemsConfirmed } = build;

	// Checks if every reason property of an item is type string and has valid length
	const validReasonTypeAndLength = itemsConfirmed
		.map((item: ItemInterface) => isValidReasonAndType(item))
		.every((boolIsTrue) => boolIsTrue);

	// Removes "reason" and "type" property which is defined by user
	const modifiedItemsConfirmed = itemsConfirmed.map((item: ItemInterface) => {
		const { reason, type, ...modifiedObject } = item;

		return modifiedObject;
	});

	// Return items from ITEMSCONFIRMED that are in ITEMS
	const validatedItems = items.filter((item) => {
		// Check if "some" items from MODIFIEDITEMSCONFIRMED are found in ITEMS
		if (
			modifiedItemsConfirmed.some(
				(buildItem) => JSON.stringify(buildItem) === JSON.stringify(item)
			)
		) {
			return item;
		}
	});

	// Check if valid items' (items that are in ITEMS array) length is
	// equal to length of ITEMSCONFIRMED
	if (
		validatedItems.length === itemsConfirmed.length &&
		validReasonTypeAndLength
	) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_ITEMS_SELECTED, false);
};

const IS_VALID_NUMBER_OF_ITEMS_SELECTED = (build: BuildInterface) => {
	const { itemsConfirmed } = build;

	const primaryItems = itemsConfirmed.filter(
		(item) => item.type === ItemType.PRIMARY
	).length;
	const optionalItems = itemsConfirmed.filter(
		(item) => item.type === ItemType.OPTIONAL
	).length;

	const isValidPrimaryItemsLength =
		primaryItems >= Validation.ITEMS.PRIMARY.MIN_LENGTH &&
		primaryItems <= Validation.ITEMS.PRIMARY.MAX_LENGTH;
	const isValidOptionalItemsLength =
		optionalItems >= Validation.ITEMS.OPTIONAL.MIN_LENGTH &&
		optionalItems <= Validation.ITEMS.OPTIONAL.MAX_LENGTH;

	if (isValidPrimaryItemsLength && isValidOptionalItemsLength) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_NUMBER_OF_ITEMS_SELECTED, false);
};

const IS_VALID_RUNES = (build: BuildInterface, runes: Array<RuneInterface>) => {
	const { runes: buildRunes } = build;
	const { keystone, domination, resolve, inspiration } = buildRunes;

	const VALID_KEYSTONE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...keystoneCopy } = keystone;

			return JSON.stringify(rune) === JSON.stringify(keystoneCopy);
		}).length === 1 && isValidReasonAndType(keystone);

	const VALID_DOMINATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...dominationCopy } = domination;

			return JSON.stringify(rune) === JSON.stringify(dominationCopy);
		}).length === 1 && isValidReasonAndType(domination);

	const VALID_RESOLVE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...resolveCopy } = resolve;

			return JSON.stringify(rune) === JSON.stringify(resolveCopy);
		}).length === 1 && isValidReasonAndType(resolve);

	const VALID_INSPIRATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...inspirationCopy } = inspiration;

			return JSON.stringify(rune) === JSON.stringify(inspirationCopy);
		}).length === 1 && isValidReasonAndType(inspiration);

	if (
		VALID_KEYSTONE &&
		VALID_DOMINATION &&
		VALID_RESOLVE &&
		VALID_INSPIRATION
	) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_RUNES, false);
};

const IS_VALID_SPELLS = (
	build: BuildInterface,
	spells: Array<SpellInterface>
) => {
	const { spells: buildSpells } = build;
	const { spellOne, spellTwo } = buildSpells;

	const VALID_SPELL_ONE =
		spells.filter((spell) => {
			return JSON.stringify(spell) === JSON.stringify(spellOne);
		}).length === 1;

	const VALID_SPELL_TWO =
		spells.filter((spell) => {
			return JSON.stringify(spell) === JSON.stringify(spellTwo);
		}).length === 1;

	if (VALID_SPELL_ONE && VALID_SPELL_TWO) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_SPELLS, false);
};

const IS_VALID_RANK = (build: BuildInterface, ranks: Array<RankInterface>) => {
	const { rank: buildRank } = build;

	const isValidRank =
		ranks.filter((rank) => {
			return JSON.stringify(rank) === JSON.stringify(buildRank);
		}).length === 1;

	if (isValidRank) {
		return resultHandler(null, true);
	}

	return resultHandler(ERROR.NOT_VALID_RANK, false);
};

export const VALIDATE = {
	HAS_BUILD_TITLE,
	HAS_ITEMS_SELECTED,
	HAS_THREE_TO_SIX_PRIMARY_ITEMS,
	HAS_USERNAME,
	IS_VALID_BUILD_TITLE,
	IS_VALID_USERNAME,
	IS_VALID_ROLE,
	IS_VALID_CHAMPION,
	IS_VALID_ITEMS_SELECTED,
	IS_VALID_NUMBER_OF_ITEMS_SELECTED,
	IS_VALID_RUNES,
	IS_VALID_SPELLS,
	IS_VALID_RANK,
};
