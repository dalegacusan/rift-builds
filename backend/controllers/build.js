const Build = require('../models/Build');
const championNameCounterparts = require('../utils/championNameCounterparts');
const logger = require('../utils/logger');
const fetch = require("node-fetch");
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const getAllBuilds = async (req, res, next) => {
	const { page } = req.body;

	try {

		const allBuilds = await Build.find().skip(page - 5).limit(5);

		logger.info("Response Length:", allBuilds.length);

		res.status(200).json(allBuilds);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all builds.',
		});

		next(err);
	}
};

const getOneBuild = async (req, res, next) => {
	const { buildId } = req.params;

	try {
		const oneBuild = await Build.findById(buildId);

		res.status(200).json(oneBuild);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve build.',
		});

		next(err);
	}
};

const getAllBuildsForChampion = (req, res, next) => {
	const { page } = req.body;
	const { championName } = req.params;

	// Sort by NEWEST date submitted
	const allBuilds = Build
		.find({ 'champion.championName': championNameCounterparts[championName] })
		.sort({ dateSubmitted: -1 })
		.skip(page - 5)
		.limit(5);
	const buildsCount = Build
		.countDocuments({ 'champion.championName': championNameCounterparts[championName] });

	Promise.all([buildsCount, allBuilds])
		.then(values => {
			const count = values[0];
			const builds = values[1];

			res.status(200).json({
				builds,
				buildsCount: count
			});

		})
		.catch(err => {
			res.status(400).json({
				message: 'Failed to retrieve all builds for this champion.',
			});

			next(err);
		})

}

const saveBuild = async (req, res, next) => {
	const { build, recaptchaToken } = req.body;
	const { itemsConfirmed } = build;

	const isHuman = await validateHuman(recaptchaToken);

	var itemArray = itemsConfirmed.map((item) => {
		return item.id;
	});
	var isDuplicate = itemArray.some((item, index) => {
		return itemArray.indexOf(item) != index;
	});

	if (!isDuplicate && isHuman) {
		const newBuild = new Build(build);

		newBuild.save()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				logger.error('Error: ', err);

				res.status(400).json({
					message: err.message,
				});

				next(err);
			});

	} else {
		res.status(400).json({ message: 'Something went wrong. Please try again' });
	}

}

const validateHuman = async (recaptchaToken) => {
	const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, {
		method: "POST",
	})
		.then(res => res.json())
		.then(json => {
			return json.success;
		});

	return response;
}

module.exports = {
	getAllBuilds,
	getOneBuild,
	saveBuild,
	getAllBuildsForChampion
}