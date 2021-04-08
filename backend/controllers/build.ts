import { Request, Response, NextFunction } from 'express';
import { BuildInterface } from '../shared/interfaces/interfaces';
import { Validate, ValidateHelper } from '../shared/utils/validations';
import { Message } from '../shared/constants/validationMessages';
import { championNameCounterparts } from '../shared/constants/championNameCounterparts';

const Build = require('../models/Build');
const logger = require('../shared/utils/logger');

const getOneBuild = async (req: Request, res: Response, next: NextFunction) => {
	const { buildId } = req.params;

	try {
		const oneBuild = await Build.findById(buildId);

		res.status(200).json(oneBuild);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.BUILD.FAILED_TO_GET_ONE_BUILD,
		});

		next(err);
	}
};

const getAllBuildsForChampion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { page } = req.body;
	const { championName } = req.params;

	// Sort by NEWEST date submitted
	const allBuilds = Build.find({
		'champion.championName': championNameCounterparts[championName],
	})
		.sort({ dateSubmitted: -1 })
		.skip(page - 5)
		.limit(5);
	const buildsCount = Build.countDocuments({
		'champion.championName': championNameCounterparts[championName],
	});

	Promise.all([buildsCount, allBuilds])
		.then((values) => {
			const count = values[0];
			const builds = values[1];

			res.status(200).json({
				builds,
				buildsCount: count,
			});
		})
		.catch((err) => {
			res.status(400).json({
				message: Message.ERROR.BUILD.FAILED_TO_GET_ALL_BUILDS_FOR_CHAMPION,
			});

			next(err);
		});
};

const saveBuild = async (req: Request, res: Response, next: NextFunction) => {
	const { build, recaptchaToken } = req.body;
	const { itemsConfirmed } = build;

	// Validations
	const HAS_BUILD_TITLE = Validate.HAS_BUILD_TITLE(build);
	const HAS_USERNAME = Validate.HAS_USERNAME(build);
	const IS_VALID_BUILD_TITLE = Validate.IS_VALID_BUILD_TITLE(build);
	const IS_VALID_USERNAME = Validate.IS_VALID_USERNAME(build);
	const IS_VALID_BUILD_DESCRIPTION = Validate.IS_VALID_BUILD_DESCRIPTION(build);
	const IS_VALID_ITEM_REASONS = Validate.IS_VALID_ITEM_REASONS(build);
	const NO_DUPLICATE_ITEMS = Validate.NO_DUPLICATE_ITEMS(itemsConfirmed);
	const IS_HUMAN = await Validate.IS_HUMAN(recaptchaToken);

	const validationsCollection = [
		HAS_BUILD_TITLE,
		HAS_USERNAME,
		IS_VALID_BUILD_TITLE,
		IS_VALID_USERNAME,
		IS_VALID_BUILD_DESCRIPTION,
		IS_VALID_ITEM_REASONS,
		NO_DUPLICATE_ITEMS,
	];

	const allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
		validationsCollection
	);

	if (allValidationsAreValid && IS_HUMAN) {
		// Create a new build document with sanitized texts
		const newBuild = new Build(ValidateHelper.sanitizeBuildTexts(build));

		newBuild
			.save()
			.then((data: BuildInterface) => {
				res.status(200).json(data);
			})
			.catch((err: Error) => {
				res.status(400).json({
					message: Message.ERROR.BUILD.FAILED_TO_SAVE_BUILD,
				});

				next(err);
			});
	} else {
		const validationError = ValidateHelper.findValidationErrorAndReturn(
			validationsCollection
		);

		res.status(400).json({
			message: validationError.errorType,
		});
	}
};

module.exports = {
	getOneBuild,
	saveBuild,
	getAllBuildsForChampion,
};
