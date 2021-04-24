import { RefObject } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from './GameData';
import { BuildInterface } from './Build';
import { snackbarControlsInterface } from './interfaces';

export interface recaptchaInterface {
	recaptcha: {
		recaptchaRef: RefObject<ReCAPTCHA>;
		recaptchaToken: '';
	};
}
export interface gameDataInterface {
	gameData: {
		builds: Array<BuildInterface>;
		champions: Array<ChampionInterface>;
		items: Array<ItemInterface>;
		ranks: Array<RankInterface>;
		roles: Array<RoleInterface>;
		runes: Array<RuneInterface>;
		spells: Array<SpellInterface>;
	};
}

export interface RootState
	extends gameDataInterface,
		recaptchaInterface,
		snackbarControlsInterface {
	build: BuildInterface;
}
