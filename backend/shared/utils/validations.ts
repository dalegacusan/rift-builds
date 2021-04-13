import { Request, Response, NextFunction } from 'express';
import {
	BuildInterface,
	ItemInterface,
	RuneInterface,
	ValidationResult,
} from '../interfaces/interfaces';
import { RequiredLength } from '../constants/requiredLengths';
import { ErrorTypes } from '../constants/constants';
import { RECAPTCHA_SECRET_KEY } from '../config/config';
const fetch = require('node-fetch');

// === START: Global Functions === //

// resultHandler is the object that gets returned for each validation
const resultHandler = (errorType: string | null, result: boolean) => {
	return {
		errorType,
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

// === END: Global Functions === //

const HAS_BUILD_TITLE = (build: BuildInterface) => {
	if (build.buildTitle) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.NO_BUILD_TITLE, false);
};

const HAS_USERNAME = (build: BuildInterface) => {
	if (build.username) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.NO_USERNAME, false);
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

	return resultHandler(ErrorTypes.NOT_VALID_BUILD_TITLE, false);
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

	return resultHandler(ErrorTypes.NOT_VALID_USERNAME, false);
};

const IS_VALID_BUILD_DESCRIPTION = (build: BuildInterface) => {
	const { description } = build;

	const isTypeString = isValidString(description);
	const isValidLength = isValidReasonLength(description);

	if (isTypeString && isValidLength) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.NOT_VALID_BUILD_DESCRIPTION, false);
};

const IS_VALID_ITEM_REASONS = (build: BuildInterface) => {
	const { itemsConfirmed } = build;

	// Checks if every reason property of an item is type string and has valid length
	const isValidItemReasons = itemsConfirmed
		.map((item: ItemInterface) => isValidReasonTypeAndLength(item))
		.every((boolIsTrue) => boolIsTrue);

	if (isValidItemReasons) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.NOT_VALID_ITEMS_SELECTED, false);
};

const NO_DUPLICATE_ITEMS = (itemsConfirmed: Array<ItemInterface>) => {
	const itemIDsArray = itemsConfirmed.map((item) => {
		return item.id;
	});
	const hasDuplicateItems = itemIDsArray.some((item, index) => {
		return itemIDsArray.indexOf(item) != index;
	});

	if (!hasDuplicateItems) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.HAS_DUPLICATE_ITEMS, false);
};

// For ReCAPTCHA
const IS_HUMAN = async (recaptchaToken: string) => {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
		}
	)
		.then((res: Response) => res.json())
		.then((json: any) => {
			return json.success;
		});

	if (response) {
		return resultHandler(null, true);
	}

	return resultHandler(ErrorTypes.FAILED_TO_SAVE_BUILD, false);
};

export const Validate = {
	HAS_BUILD_TITLE,
	HAS_USERNAME,
	IS_VALID_BUILD_TITLE,
	IS_VALID_USERNAME,
	IS_VALID_BUILD_DESCRIPTION,
	IS_VALID_ITEM_REASONS,
	NO_DUPLICATE_ITEMS,
	IS_HUMAN,
};

export const ValidateHelper = {
	findValidationErrorAndReturn,
	checkAllValidationsAreValid,
	sanitizeBuildTexts,
	turnToString,
};
