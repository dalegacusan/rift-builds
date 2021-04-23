import {
	RoleInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from './GameData';

export interface BuildInterface {
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
