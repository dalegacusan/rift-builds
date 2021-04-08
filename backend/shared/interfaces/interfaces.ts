import { Document } from 'mongoose';

export interface BuildInterface extends Document {
	id?: string;
	buildTitle: string;
	buildRole: RoleInterface;
	champion: ChampionInterface;
	dateSubmitted?: Date;
	description: string;
	gameMode: string;
	itemsConfirmed: ItemInterface[];
	patchVersion: string;
	rank: RankInterface;
	runes: {
		keystone: RuneInterface;
		domination: RuneInterface;
		resolve: RuneInterface;
		inspiration: RuneInterface;
	};
	region: string;
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
}

export interface RankInterface {
	id: string;
	rankName: string;
}

export interface RuneInterface {
	id: string;
	cooldown?: string;
	description: Array<string>;
	path?: string;
	reason?: string;
	runeName: string;
	type: string;
}

export interface SpellInterface {
	id: string;
	spellName: string;
	applicableMaps: Array<string>;
	description: Array<string>;
	cooldown: string;
}

export interface RoleInterface {
	id: string;
	roleName: string;
}

export interface ValidationResult {
	errorType: string | null;
	result: boolean;
}
