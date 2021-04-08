import {
	BuildInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
	ValidationResult,
} from '../interfaces/interfaces';
import { ItemType, GameMode, GameRegion } from '../constants/constants';
import { RequiredLength } from '../constants/requiredLength';
import { Message } from '../constants/validationMessages';

// === START: Global Functions === //

// resultHandler is the object that gets returned for each validation
// and the value of CreateBuild.tsx's isValidBuild variable
const resultHandler = (message: string | null, result: boolean) => {
	return {
		message,
		result,
	};
};

const turnToString = (text: string) => {
	return String(text);
};

const isValidString = (text: string) => {
	return typeof text === 'string';
};

const isValidReasonLength = (text: string) => {
	const isValidReasonLength =
		text.length >= RequiredLength.REASON.MIN_LENGTH &&
		text.length <= RequiredLength.REASON.MAX_LENGTH;

	return isValidReasonLength;
};

const isValidReasonTypeAndLength = (
	objectToCheck: RuneInterface | ItemInterface
) => {
	const { reason } = objectToCheck;

	// If there's a reason property, check if it's the right type
	// and right length
	// This will always return true if it doesn't fail any of the
	// two conditions
	if (reason) {
		const isValidType = isValidString(reason);
		const isValidLength = isValidReasonLength(reason);

		if (!(isValidType && isValidLength)) return false;
	}

	return true;
};

// Find all validations that returned false
// Return first validation that failed, hence [0]
const findValidationErrorAndReturn = (
	validationsCollection: Array<ValidationResult>
) => {
	return validationsCollection.filter((validation) => {
		const { result } = validation;

		if (result === false) {
			return validation;
		}
	})[0];
};

const checkAllValidationsAreValid = (
	validationsCollection: Array<ValidationResult>
) => {
	return validationsCollection.every((validation: ValidationResult) => {
		const { result } = validation;

		return result === true;
	});
};

const sanitizeBuildTexts = (build: BuildInterface) => {
	const { itemsConfirmed } = build;

	// run turnToString() on each item reason property, if it's defined
	const sanitizedItemsConfirmedReasons = itemsConfirmed.map(
		(item: ItemInterface) => {
			const { reason } = item;

			if (reason) {
				return {
					...item,
					reason: turnToString(reason).trim(),
				};
			}

			// return item if there's no reason property
			return item;
		}
	);

	return {
		...build,
		buildTitle: turnToString(build.buildTitle).trim(),
		description: turnToString(build.description).trim(),
		username: turnToString(build.username).trim(),
		itemsConfirmed: sanitizedItemsConfirmedReasons,
	};
};

// Validations for each step
const validateStep = (
	activeStep: number,
	completeBuild: BuildInterface,
	champions: Array<ChampionInterface>,
	items: Array<ItemInterface>,
	runes: Array<RuneInterface>,
	spells: Array<SpellInterface>,
	roles: Array<RoleInterface>
) => {
	let allValidationsAreValid = false;
	let validationsCollection: Array<ValidationResult> = [];

	if (activeStep === 0) {
		const HAS_BUILD_TITLE = Validate.HAS_BUILD_TITLE(completeBuild);
		const IS_VALID_BUILD_TITLE = Validate.IS_VALID_BUILD_TITLE(completeBuild);
		const IS_VALID_ROLE = Validate.IS_VALID_ROLE(completeBuild, roles);
		const IS_VALID_GAME_MODE = Validate.IS_VALID_GAME_MODE(completeBuild);
		const IS_VALID_BUILD_DESCRIPTION = Validate.IS_VALID_BUILD_DESCRIPTION(
			completeBuild
		);

		validationsCollection = [
			HAS_BUILD_TITLE,
			IS_VALID_BUILD_TITLE,
			IS_VALID_ROLE,
			IS_VALID_GAME_MODE,
			IS_VALID_BUILD_DESCRIPTION,
		];

		allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
			validationsCollection
		);
	} else if (activeStep === 1) {
		const IS_VALID_CHAMPION = Validate.IS_VALID_CHAMPION(
			completeBuild,
			champions
		);
		const HAS_ITEMS_SELECTED = Validate.HAS_ITEMS_SELECTED(completeBuild);
		const HAS_THREE_TO_SIX_PRIMARY_ITEMS = Validate.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
			completeBuild
		);
		const IS_VALID_ITEMS_SELECTED = Validate.IS_VALID_ITEMS_SELECTED(
			completeBuild,
			items
		);
		const IS_VALID_NUMBER_OF_ITEMS_SELECTED = Validate.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
			completeBuild
		);
		const IS_VALID_RUNES = Validate.IS_VALID_RUNES(completeBuild, runes);
		const IS_VALID_SPELLS = Validate.IS_VALID_SPELLS(completeBuild, spells);

		validationsCollection = [
			IS_VALID_CHAMPION,
			HAS_ITEMS_SELECTED,
			HAS_THREE_TO_SIX_PRIMARY_ITEMS,
			IS_VALID_ITEMS_SELECTED,
			IS_VALID_NUMBER_OF_ITEMS_SELECTED,
			IS_VALID_RUNES,
			IS_VALID_SPELLS,
		];

		allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
			validationsCollection
		);
	}

	if (allValidationsAreValid) {
		return resultHandler(null, true);
	}

	// Find all validations that returned false
	// Return first validation that failed, hence [0]
	const invalidValidation = ValidateHelper.findValidationErrorAndReturn(
		validationsCollection
	);

	return resultHandler(invalidValidation.message, false);
};

// For FINAL validation
const validateBuild = (
	completeBuild: BuildInterface,
	champions: Array<ChampionInterface>,
	items: Array<ItemInterface>,
	runes: Array<RuneInterface>,
	spells: Array<SpellInterface>,
	ranks: Array<RankInterface>,
	roles: Array<RoleInterface>
) => {
	const HAS_BUILD_TITLE = Validate.HAS_BUILD_TITLE(completeBuild);
	const IS_VALID_BUILD_TITLE = Validate.IS_VALID_BUILD_TITLE(completeBuild);
	const HAS_ITEMS_SELECTED = Validate.HAS_ITEMS_SELECTED(completeBuild);
	const HAS_THREE_TO_SIX_PRIMARY_ITEMS = Validate.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
		completeBuild
	);
	const HAS_USERNAME = Validate.HAS_USERNAME(completeBuild);
	const IS_VALID_USERNAME = Validate.IS_VALID_USERNAME(completeBuild);
	const IS_VALID_ROLE = Validate.IS_VALID_ROLE(completeBuild, roles);
	const IS_VALID_GAME_MODE = Validate.IS_VALID_GAME_MODE(completeBuild);
	const IS_VALID_BUILD_DESCRIPTION = Validate.IS_VALID_BUILD_DESCRIPTION(
		completeBuild
	);
	const IS_VALID_CHAMPION = Validate.IS_VALID_CHAMPION(
		completeBuild,
		champions
	);
	const IS_VALID_ITEMS_SELECTED = Validate.IS_VALID_ITEMS_SELECTED(
		completeBuild,
		items
	);
	const IS_VALID_RUNES = Validate.IS_VALID_RUNES(completeBuild, runes);
	const IS_VALID_SPELLS = Validate.IS_VALID_SPELLS(completeBuild, spells);
	const IS_VALID_RANK = Validate.IS_VALID_RANK(completeBuild, ranks);
	const IS_VALID_NUMBER_OF_ITEMS_SELECTED = Validate.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
		completeBuild
	);
	const IS_VALID_REGION = Validate.IS_VALID_REGION(completeBuild);

	const validationsCollection = [
		HAS_BUILD_TITLE,
		IS_VALID_BUILD_TITLE,
		HAS_ITEMS_SELECTED,
		HAS_THREE_TO_SIX_PRIMARY_ITEMS,
		HAS_USERNAME,
		IS_VALID_USERNAME,
		IS_VALID_ROLE,
		IS_VALID_GAME_MODE,
		IS_VALID_BUILD_DESCRIPTION,
		IS_VALID_CHAMPION,
		IS_VALID_ITEMS_SELECTED,
		IS_VALID_RUNES,
		IS_VALID_SPELLS,
		IS_VALID_RANK,
		IS_VALID_NUMBER_OF_ITEMS_SELECTED,
		IS_VALID_REGION,
	];

	const allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
		validationsCollection
	);

	if (allValidationsAreValid) {
		return {
			message: null,
			result: true,
		};
	}

	return findValidationErrorAndReturn(validationsCollection);
};

// === END: Global Functions === //

const HAS_BUILD_TITLE = (build: BuildInterface) => {
	if (build.buildTitle) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NO_BUILD_TITLE, false);
};

const HAS_ITEMS_SELECTED = (build: BuildInterface) => {
	if (build.itemsConfirmed.length !== 0) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NO_ITEMS_SELECTED, false);
};

const HAS_THREE_TO_SIX_PRIMARY_ITEMS = (build: BuildInterface) => {
	const lengthOfPrimaryItems = build.itemsConfirmed.filter(
		(item: ItemInterface) => item.type === 'primary'
	).length;

	const hasThreeToSixPrimaryItems =
		lengthOfPrimaryItems >= RequiredLength.ITEMS.PRIMARY.MIN_LENGTH &&
		lengthOfPrimaryItems <= RequiredLength.ITEMS.PRIMARY.MAX_LENGTH;

	if (hasThreeToSixPrimaryItems) {
		return resultHandler(null, true);
	}

	return resultHandler(
		Message.ERROR.DOES_NOT_HAVE_THREE_TO_SIX_PRIMARY_ITEMS,
		false
	);
};

const HAS_USERNAME = (build: BuildInterface) => {
	if (build.username) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NO_USERNAME, false);
};

const IS_VALID_BUILD_TITLE = (build: BuildInterface) => {
	const { buildTitle } = build;

	const isTypeString = isValidString(buildTitle);
	const isValidLength =
		buildTitle.length >= RequiredLength.BUILD_TITLE.MIN_LENGTH &&
		buildTitle.length <= RequiredLength.BUILD_TITLE.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_BUILD_TITLE, false);
};

const IS_VALID_USERNAME = (build: BuildInterface) => {
	const { username } = build;

	const isTypeString = isValidString(username);
	const isValidLength =
		username.length >= RequiredLength.USERNAME.MIN_LENGTH &&
		username.length <= RequiredLength.USERNAME.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_USERNAME, false);
};

const IS_VALID_ROLE = (build: BuildInterface, roles: Array<RoleInterface>) => {
	const { buildRole } = build;

	// Checks if buildRole.id and buildRole.roleName has a corresponding object to roles
	const isValidRole =
		roles.filter((role) => {
			return JSON.stringify(buildRole) === JSON.stringify(role);
		}).length === 1;

	if (isValidRole) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_ROLE, false);
};

const IS_VALID_GAME_MODE = (build: BuildInterface) => {
	const { gameMode } = build;

	const isValidGameMode =
		gameMode === GameMode.NORMAL || gameMode === GameMode.ARAM;
	const isTypeString = isValidString(gameMode);

	if (isValidGameMode && isTypeString) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_GAME_MODE, false);
};

const IS_VALID_BUILD_DESCRIPTION = (build: BuildInterface) => {
	const { description } = build;

	const isTypeString = isValidString(description);
	const isValidLength = isValidReasonLength(description);

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_BUILD_DESCRIPTION, false);
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

	return resultHandler(Message.ERROR.NOT_VALID_CHAMPION, false);
};

const IS_VALID_ITEMS_SELECTED = (
	build: BuildInterface,
	items: Array<ItemInterface>
) => {
	const { itemsConfirmed } = build;

	// Checks if every reason property of an item is type string and has valid length
	const validReasonTypeAndLength = itemsConfirmed
		.map((item: ItemInterface) => isValidReasonTypeAndLength(item))
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

	return resultHandler(Message.ERROR.NOT_VALID_ITEMS_SELECTED, false);
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
		primaryItems >= RequiredLength.ITEMS.PRIMARY.MIN_LENGTH &&
		primaryItems <= RequiredLength.ITEMS.PRIMARY.MAX_LENGTH;
	const isValidOptionalItemsLength =
		optionalItems >= RequiredLength.ITEMS.OPTIONAL.MIN_LENGTH &&
		optionalItems <= RequiredLength.ITEMS.OPTIONAL.MAX_LENGTH;

	if (isValidPrimaryItemsLength && isValidOptionalItemsLength) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_NUMBER_OF_ITEMS_SELECTED, false);
};

const IS_VALID_RUNES = (build: BuildInterface, runes: Array<RuneInterface>) => {
	const { runes: buildRunes } = build;
	const { keystone, domination, resolve, inspiration } = buildRunes;

	const VALID_KEYSTONE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...keystoneCopy } = keystone;

			return JSON.stringify(rune) === JSON.stringify(keystoneCopy);
		}).length === 1 && isValidReasonTypeAndLength(keystone);

	const VALID_DOMINATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...dominationCopy } = domination;

			return JSON.stringify(rune) === JSON.stringify(dominationCopy);
		}).length === 1 && isValidReasonTypeAndLength(domination);

	const VALID_RESOLVE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...resolveCopy } = resolve;

			return JSON.stringify(rune) === JSON.stringify(resolveCopy);
		}).length === 1 && isValidReasonTypeAndLength(resolve);

	const VALID_INSPIRATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...inspirationCopy } = inspiration;

			return JSON.stringify(rune) === JSON.stringify(inspirationCopy);
		}).length === 1 && isValidReasonTypeAndLength(inspiration);

	if (
		VALID_KEYSTONE &&
		VALID_DOMINATION &&
		VALID_RESOLVE &&
		VALID_INSPIRATION
	) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_RUNES, false);
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

	return resultHandler(Message.ERROR.NOT_VALID_SPELLS, false);
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

	return resultHandler(Message.ERROR.NOT_VALID_RANK, false);
};

const IS_VALID_REGION = (build: BuildInterface) => {
	const { region } = build;

	const isValidRegion =
		region === GameRegion.SEA ||
		region === GameRegion.NA ||
		region === GameRegion.EUW;
	const isTypeString = isValidString(region);

	if (isValidRegion && isTypeString) {
		return resultHandler(null, true);
	}

	return resultHandler(Message.ERROR.NOT_VALID_REGION, false);
};

export const Validate = {
	HAS_BUILD_TITLE,
	HAS_ITEMS_SELECTED,
	HAS_THREE_TO_SIX_PRIMARY_ITEMS,
	HAS_USERNAME,
	IS_VALID_BUILD_TITLE,
	IS_VALID_USERNAME,
	IS_VALID_ROLE,
	IS_VALID_GAME_MODE,
	IS_VALID_BUILD_DESCRIPTION,
	IS_VALID_CHAMPION,
	IS_VALID_ITEMS_SELECTED,
	IS_VALID_NUMBER_OF_ITEMS_SELECTED,
	IS_VALID_RUNES,
	IS_VALID_SPELLS,
	IS_VALID_RANK,
	IS_VALID_REGION,
};

export const ValidateHelper = {
	validateBuild,
	validateStep,
	findValidationErrorAndReturn,
	checkAllValidationsAreValid,
	sanitizeBuildTexts,
};
