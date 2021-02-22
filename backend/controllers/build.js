const Build = require('../models/Build');
const logger = require('../utils/logger');

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
	const { championId } = req.params;

	const allBuilds = Build.find({ 'champion.id': championId }).skip(page - 5).limit(5);
	const buildsCount = Build.countDocuments({ 'champion.id': championId });

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

const saveBuild = (req, res, next) => {
	const { itemsConfirmed } = req.body;

	var itemArray = itemsConfirmed.map((item) => {
		return item.id;
	});
	var isDuplicate = itemArray.some((item, index) => {
		return itemArray.indexOf(item) != index;
	});

	if (!isDuplicate) {
		logger.info('No duplicates found');

		const newBuild = new Build(req.body);

		newBuild.save()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				logger.error('Error: ', err);

				res.status(400).json({
					message: 'Failed to save build to the database.',
				});

				next(err);
			});

	} else {
		console.log('DUPLICATES');
		res.status(400).json({ message: 'There are duplicate items that made it through!' });
	}

}

module.exports = {
	getAllBuilds,
	getOneBuild,
	saveBuild,
	getAllBuildsForChampion
}