export interface RoleInterface {
	id: string;
	roleName: string;
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

export interface CountersInterface {
	id: string;
	championName: string;
}