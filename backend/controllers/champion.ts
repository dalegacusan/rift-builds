import champions from '../data/wildriftchampions.json';
import { Request, Response, NextFunction } from 'express';
import { ChampionInterface } from '../shared/interfaces/interfaces';
import { ValidateHelper } from '../shared/utils/validations';
import { championNameCounterparts } from '../shared/constants/championNameCounterparts';
const Message = require('../shared/constants/validationMessages');

const getAllChampions = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(champions);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.CHAMPION.FAILED_TO_GET_DATA_FOR_ALL_CHAMPIONS,
		});

		next(err);
	}
};

const getOneChampion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { championName } = req.params;

	championName = ValidateHelper.turnToString(championName);

	// Check if championName in URL parameter is a VALID champion name
	// and found in championNameCounterparts
	if (!championNameCounterparts[championName]) {
		res.status(400).json({
			message: Message.ERROR.CHAMPION.FAILED_TO_GET_DATA_FOR_CHAMPION,
		});
	}

	try {
		const oneChampion = champions.filter(
			(champion: ChampionInterface) =>
				championNameCounterparts[championName] === champion.championName
		);

		res.status(200).json(oneChampion);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.CHAMPION.FAILED_TO_GET_DATA_FOR_CHAMPION,
		});

		next(err);
	}
};

module.exports = {
	getAllChampions,
	getOneChampion,
};
