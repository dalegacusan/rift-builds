import {
	BuildInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from '../constants/interfaces';

// Build Title Length = 24
// Username length = 22

const HAS_BUILD_TITLE = (build: BuildInterface) => build.buildTitle;
const IS_VALID_BUILD_TITLE = (build: BuildInterface) => {
	const { buildTitle } = build;

	const isTypeString = typeof buildTitle === 'string';
	const isValidLength = buildTitle.length > 0 && buildTitle.length <= 24;

	return isTypeString && isValidLength;
};

const HAS_ITEMS_SELECTED = (build: BuildInterface) =>
	build.itemsConfirmed.length !== 0;

const HAS_SIX_PRIMARY_ITEMS = (build: BuildInterface) => {
	return (
		build.itemsConfirmed.filter(
			(item: ItemInterface) => item.type === 'primary'
		).length === 6
	);
};

const HAS_USERNAME = (build: BuildInterface) => build.username;
const IS_VALID_USERNAME = (build: BuildInterface) => {
	const { username } = build;

	const isTypeString = typeof username === 'string';
	const isValidLength = username.length > 0 && username.length <= 22;

	return isTypeString && isValidLength;
};

const IS_VALID_ROLE = (build: BuildInterface, roles: Array<RoleInterface>) => {
	const { buildRole } = build;

	// Checks if buildRole.id and buildRole.roleName has a corresponding object to the fixed options
	// Checks if LENGTH is 1 which means that it matches with one of the fixed options
	// RETURNS A BOOLEAN
	return (
		roles.filter((role) => {
			const { id, roleName } = role;

			return id === buildRole.id && roleName === buildRole.roleName;
		}).length === 1
	);
};

const IS_VALID_CHAMPION = (
	build: BuildInterface,
	champions: Array<ChampionInterface>
) => {
	const { champion: buildChampion } = build;

	return (
		champions.filter((champion) => {
			// Checks if both objects have same properties and corresponding values
			// Checks if LENGTH is 1 which means that it matches with one of the fixed options
			// THE ORDER OF PROPERTIES IS IMPORTANT
			// Source: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

			return JSON.stringify(buildChampion) === JSON.stringify(champion);
		}).length === 1
	);
};

const IS_VALID_ITEMS_SELECTED = (
	build: BuildInterface,
	items: Array<ItemInterface>
) => {
	const { itemsConfirmed } = build;

	// Checks if every reason property of item has type string value
	const validReasonTypeAndLength = itemsConfirmed
		.map((item: ItemInterface) => {
			const { reason } = item;

			// If there's a reason property, check if it's the right type
			// and right length
			// This will always return true if it doesn't fail any of the
			// two conditions
			if (reason) {
				const isValidType = typeof reason === 'string';
				// -1 because reason can be empty
				const isValidLength = reason.length > -1 && reason.length <= 400;

				if (!(isValidType && isValidLength)) return false;
			}

			return true;
		})
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
	// equal to length of itemsConfirmed
	return (
		validatedItems.length === itemsConfirmed.length && validReasonTypeAndLength
	);
};

const IS_VALID_RUNES = (build: BuildInterface, runes: Array<RuneInterface>) => {
	const { runes: buildRunes } = build;
	const { keystone, domination, resolve, inspiration } = buildRunes;

	const isValidReasonAndType = (rune: RuneInterface) => {
		const { reason } = rune;

		if (reason) {
			const isValidType = typeof reason === 'string';
			// -1 because reason can be empty
			const isValidLength = reason.length > -1 && reason.length <= 400;

			if (!(isValidType && isValidLength)) return false;
		}

		return true;
	};

	const VALID_KEYSTONE = () => {
		return (
			runes.filter((rune) => {
				// Remove reason property from buildRune;
				const { reason, ...keystoneCopy } = keystone;

				return JSON.stringify(rune) === JSON.stringify(keystoneCopy);
			}).length === 1 && isValidReasonAndType(keystone)
		);
	};
	const VALID_DOMINATION = () => {
		return (
			runes.filter((rune) => {
				// Remove reason property from buildRune;
				const { reason, ...dominationCopy } = domination;

				return JSON.stringify(rune) === JSON.stringify(dominationCopy);
			}).length === 1 && isValidReasonAndType(domination)
		);
	};
	const VALID_RESOLVE = () => {
		return (
			runes.filter((rune) => {
				// Remove reason property from buildRune;
				const { reason, ...resolveCopy } = resolve;

				return JSON.stringify(rune) === JSON.stringify(resolveCopy);
			}).length === 1 && isValidReasonAndType(resolve)
		);
	};
	const VALID_INSPIRATION = () => {
		return (
			runes.filter((rune) => {
				// Remove reason property from buildRune;
				const { reason, ...inspirationCopy } = inspiration;

				return JSON.stringify(rune) === JSON.stringify(inspirationCopy);
			}).length === 1 && isValidReasonAndType(inspiration)
		);
	};

	return (
		VALID_KEYSTONE() &&
		VALID_DOMINATION() &&
		VALID_RESOLVE() &&
		VALID_INSPIRATION()
	);
};

const IS_VALID_SPELLS = (
	build: BuildInterface,
	spells: Array<SpellInterface>
) => {
	const { spells: buildSpells } = build;
	const { spellOne, spellTwo } = buildSpells;

	const VALID_SPELL_ONE = () => {
		return (
			spells.filter((spell) => {
				return JSON.stringify(spell) === JSON.stringify(spellOne);
			}).length === 1
		);
	};
	const VALID_SPELL_TWO = () => {
		return (
			spells.filter((spell) => {
				return JSON.stringify(spell) === JSON.stringify(spellTwo);
			}).length === 1
		);
	};

	return VALID_SPELL_ONE() && VALID_SPELL_TWO;
};

const IS_VALID_RANK = (build: BuildInterface, ranks: Array<RankInterface>) => {
	const { rank: buildRank } = build;

	return (
		ranks.filter((rank) => {
			return JSON.stringify(rank) === JSON.stringify(buildRank);
		}).length === 1
	);
};

export const VALIDATE = {
	HAS_BUILD_TITLE,
	IS_VALID_BUILD_TITLE,
	HAS_ITEMS_SELECTED,
	HAS_SIX_PRIMARY_ITEMS,
	HAS_USERNAME,
	IS_VALID_USERNAME,
	IS_VALID_ROLE,
	IS_VALID_CHAMPION,
	IS_VALID_ITEMS_SELECTED,
	IS_VALID_RUNES,
	IS_VALID_SPELLS,
	IS_VALID_RANK,
};
