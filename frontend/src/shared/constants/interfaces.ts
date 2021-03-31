import { RefObject } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export interface BuildInterface {
	id?: string;
	buildTitle: string;
	buildRole: RoleInterface;
	champion: ChampionInterface;
	dateSubmitted?: Date;
	itemsConfirmed: ItemInterface[];
	patchVersion: string;
	rank: RankInterface;
	runes: {
		keystone: RuneInterface;
		domination: RuneInterface;
		resolve: RuneInterface;
		inspiration: RuneInterface;
	};
	spells: {
		spellOne: SpellInterface;
		spellTwo: SpellInterface;
	};
	username: string;
}

export interface CountersInterface {
	id: string;
	championName: string;
}

export interface ChampionInterface {
	id: string;
	championName: string;
	counters: {
		weakAgainst: Array<CountersInterface>;
		strongAgainst: Array<CountersInterface>;
	};
	lane: Array<string>;
	tier: {
		Top?: string;
		Jungle?: string;
		Middle?: string;
		Bottom?: string;
		Support?: string;
	};
	title: string;
	url: string;
}

export interface ItemInterface {
	id: string;
	category: string;
	description: Array<string>;
	itemName: string;
	status: string;
	price: number;
	reason?: string;
	statistics: Array<string>;
	tier: string;
	type?: string;
	url: string;
}

export interface RankInterface {
	id: string;
	rankName: string;
	url: string;
}

export interface RuneInterface {
	id: string;
	cooldown?: string;
	description: Array<String>;
	path?: string;
	reason?: string;
	runeName: string;
	type: string;
	url: string;
}

export interface SpellInterface {
	id: string;
	spellName: string;
	applicableMaps: Array<String>;
	description: Array<String>;
	cooldown: string;
	url: string;
}

export interface RoleInterface {
	id: string;
	roleName: string;
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

export interface recaptchaInterface {
	recaptcha: {
		recaptchaRef: RefObject<ReCAPTCHA>;
		recaptchaToken: '';
	};
}

export interface snackbarControlsInterface {
	snackbarControls: {
		message: string | null;
		shouldOpen: boolean;
		snackbarType: string;
	};
}

export interface RootState
	extends gameDataInterface,
		recaptchaInterface,
		snackbarControlsInterface {
	build: BuildInterface;
}
