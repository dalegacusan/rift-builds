const Build = require('../models/Build');

const getAllBuilds = async (req, res, next) => {
	const { page } = req.body;

	try {

		const allBuilds = await Build.find().skip(page - 5).limit(5);

		console.log("Response Length:", allBuilds.length);

		res.status(200).json(allBuilds);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all builds.',
		});

		next(err);
	}
};

const getBuild = async (req, res, next) => {
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

const saveBuild = (req, res, next) => {
	const { username, champion, items, rank } = req.body;

	// ===== Test for Duplicates ===== // 
	// const duplicatedItems = [
	// 	{
	// 		id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
	// 		itemName: 'Adaptive Helm',
	// 		url: 'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png'
	// 	},
	// 	{
	// 		id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
	// 		itemName: 'Adaptive Helm',
	// 		url: 'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png'
	// 	}
	// ]
	// const notDuplicatedItems = [
	// 	{
	// 		id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
	// 		itemName: 'Adaptive Helm',
	// 		url: 'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png'
	// 	},
	// 	{
	// 		id: '349f8ff7-22fa-4d56-9228-5b42ec66b41a',
	// 		itemName: 'Adaptive Helm',
	// 		url: 'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png'
	// 	}
	// ]
	// ===== Test for Duplicates ===== // 

	var itemArray = items.map((item) => {
		return item.id;
	});
	var isDuplicate = itemArray.some((item, index) => {
		return itemArray.indexOf(item) != index;
	});

	if (!isDuplicate) {
		console.log('No duplicates found');

		const newBuild = new Build(req.body);

		newBuild.save()
			.then((data) => {
				const { username } = data;
				console.log(`Successfully saved ${username} to the database.`);

				res.status(200).json({
					message: `Successfully saved ${username} to the database.`,
				});
			})
			.catch((err) => {
				console.log('Error: ', err);

				res.status(400).json({
					message: 'Failed to save build to the database.',
				});

				next(err);
			});

	} else {
		console.log('duplicates');
		res.status(400).json({ message: 'Duplicates!' });
	}

}

const getBuildForHero = async (req, res, next) => {
	const { page } = req.body;
	const { heroId } = req.params;

	try {

		const allBuilds = await Build.find({ 'champion.id': heroId }).skip(page - 5).limit(5);

		console.log("Response Length:", allBuilds.length);

		res.status(200).json(allBuilds);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all builds.',
		});

		next(err);
	}

}

module.exports = {
	getAllBuilds,
	getBuild,
	saveBuild,
	getBuildForHero
}