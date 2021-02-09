export interface ItemInterface {
	id: string;
	category: string;
	description: Array<string>;
	itemName: string;
	reason?: string;
	statistics: Array<string>;
	tier: string;
	type?: string;
	url: string;
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
	lane: Array<String>;
	title: string;
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
	runeName: string;
	type: string;
	url: string;
}

export interface SpellInterface {
	id: string;
	cooldown: string;
	description: Array<String>;
	spellName: string;
	url: string;
}

export interface BuildInterface {
	id: string;
	champion: ChampionInterface;
	dateSubmitted?: string;
	items: ItemInterface[];
	rank: RankInterface;
	runes: RuneInterface;
	spells: Array<SpellInterface>;
	username: string;
}
