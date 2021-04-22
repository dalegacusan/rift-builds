import {
	BuildInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from '../interfaces/Build';
import { ValidationResult } from '../interfaces/interfaces';
import { BuildValidation } from './buildValidation';
import { RequiredLength } from '../constants/requiredLength';

// resultHandler is the object that gets returned for each validation
// and the value of CreateBuild.tsx's isValidBuild variable
const resultHandler = (message: string | null, result: boolean) => {
	return {
		message,
		result,
	};
};

const trimString = (text: string) => {
	return text.trim();
};

const turnToString = (text: string) => {
	return String(text);
};

const isValidString = (text: string) => {
	return typeof text === 'string';
};

const isValidReasonLength = (text: string) => {
	return (
		text.length >= RequiredLength.REASON.MIN_LENGTH &&
		text.length <= RequiredLength.REASON.MAX_LENGTH
	);
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
const findFailedValidation = (
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

// Applies toString() and trim() to each text input
const sanitizeBuildTextInputs = (build: BuildInterface) => {
	const { buildTitle, description, username, itemsConfirmed } = build;

	// run turnToString() on each item reason property, if it's defined
	const sanitizeItemReasons = itemsConfirmed.map((item: ItemInterface) => {
		const { reason } = item;

		if (reason) {
			return {
				...item,
				reason: turnToString(trimString(reason)),
			};
		}

		// return item if there's no reason property
		return item;
	});

	return {
		...build,
		buildTitle: turnToString(trimString(buildTitle)),
		description: turnToString(trimString(description)),
		username: turnToString(trimString(username)),
		itemsConfirmed: sanitizeItemReasons,
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
		const HAS_BUILD_TITLE = BuildValidation.HAS_BUILD_TITLE(completeBuild);
		const IS_VALID_BUILD_TITLE = BuildValidation.IS_VALID_BUILD_TITLE(
			completeBuild
		);
		const IS_VALID_ROLE = BuildValidation.IS_VALID_ROLE(completeBuild, roles);
		const IS_VALID_GAME_MODE = BuildValidation.IS_VALID_GAME_MODE(
			completeBuild
		);
		const IS_VALID_BUILD_DESCRIPTION = BuildValidation.IS_VALID_BUILD_DESCRIPTION(
			completeBuild
		);

		validationsCollection = [
			HAS_BUILD_TITLE,
			IS_VALID_BUILD_TITLE,
			IS_VALID_ROLE,
			IS_VALID_GAME_MODE,
			IS_VALID_BUILD_DESCRIPTION,
		];

		allValidationsAreValid = checkAllValidationsAreValid(validationsCollection);
	} else if (activeStep === 1) {
		const IS_VALID_CHAMPION = BuildValidation.IS_VALID_CHAMPION(
			completeBuild,
			champions
		);
		const HAS_ITEMS_SELECTED = BuildValidation.HAS_ITEMS_SELECTED(
			completeBuild
		);
		const HAS_THREE_TO_SIX_PRIMARY_ITEMS = BuildValidation.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
			completeBuild
		);
		const IS_VALID_ITEMS_SELECTED = BuildValidation.IS_VALID_ITEMS_SELECTED(
			completeBuild,
			items
		);
		const IS_VALID_NUMBER_OF_ITEMS_SELECTED = BuildValidation.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
			completeBuild
		);
		const IS_VALID_RUNES = BuildValidation.IS_VALID_RUNES(completeBuild, runes);
		const IS_VALID_SPELLS = BuildValidation.IS_VALID_SPELLS(
			completeBuild,
			spells
		);

		validationsCollection = [
			IS_VALID_CHAMPION,
			HAS_ITEMS_SELECTED,
			HAS_THREE_TO_SIX_PRIMARY_ITEMS,
			IS_VALID_ITEMS_SELECTED,
			IS_VALID_NUMBER_OF_ITEMS_SELECTED,
			IS_VALID_RUNES,
			IS_VALID_SPELLS,
		];

		allValidationsAreValid = checkAllValidationsAreValid(validationsCollection);
	}

	if (allValidationsAreValid) {
		return resultHandler(null, true);
	}

	// Find all validations that returned false
	// Return first validation that failed, hence [0]
	const invalidValidation = findFailedValidation(validationsCollection);

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
	const HAS_BUILD_TITLE = BuildValidation.HAS_BUILD_TITLE(completeBuild);
	const IS_VALID_BUILD_TITLE = BuildValidation.IS_VALID_BUILD_TITLE(
		completeBuild
	);
	const HAS_ITEMS_SELECTED = BuildValidation.HAS_ITEMS_SELECTED(completeBuild);
	const HAS_THREE_TO_SIX_PRIMARY_ITEMS = BuildValidation.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
		completeBuild
	);
	const HAS_USERNAME = BuildValidation.HAS_USERNAME(completeBuild);
	const IS_VALID_USERNAME = BuildValidation.IS_VALID_USERNAME(completeBuild);
	const IS_VALID_ROLE = BuildValidation.IS_VALID_ROLE(completeBuild, roles);
	const IS_VALID_GAME_MODE = BuildValidation.IS_VALID_GAME_MODE(completeBuild);
	const IS_VALID_BUILD_DESCRIPTION = BuildValidation.IS_VALID_BUILD_DESCRIPTION(
		completeBuild
	);
	const IS_VALID_CHAMPION = BuildValidation.IS_VALID_CHAMPION(
		completeBuild,
		champions
	);
	const IS_VALID_ITEMS_SELECTED = BuildValidation.IS_VALID_ITEMS_SELECTED(
		completeBuild,
		items
	);
	const IS_VALID_RUNES = BuildValidation.IS_VALID_RUNES(completeBuild, runes);
	const IS_VALID_SPELLS = BuildValidation.IS_VALID_SPELLS(
		completeBuild,
		spells
	);
	const IS_VALID_RANK = BuildValidation.IS_VALID_RANK(completeBuild, ranks);
	const IS_VALID_NUMBER_OF_ITEMS_SELECTED = BuildValidation.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
		completeBuild
	);
	const IS_VALID_REGION = BuildValidation.IS_VALID_REGION(completeBuild);

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

	const allValidationsAreValid = checkAllValidationsAreValid(
		validationsCollection
	);

	if (allValidationsAreValid) {
		return {
			message: null,
			result: true,
		};
	}

	return findFailedValidation(validationsCollection);
};

export const BuildValidationHelper = {
	resultHandler,
	validateBuild,
	validateStep,
	findFailedValidation,
	checkAllValidationsAreValid,
	sanitizeBuildTextInputs,
	isValidReasonTypeAndLength,
	isValidString,
	isValidReasonLength,
};
