export interface BuildInterface {
	id?: string;
	buildTitle: string;
	buildRole: string;
	champion: ChampionInterface;
	dateSubmitted?: Date;
	itemsConfirmed: ItemInterface[];
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
	reason?: string;
	price: number;
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
	cooldown: string;
	description: Array<String>;
	spellName: string;
	url: string;
}

export interface RoleInterface {
	id: string;
	role: string;
}

export interface gameDataInterface {
	gameData: {
		builds: Array<BuildInterface>;
		champions: Array<ChampionInterface>;
		items: Array<ItemInterface>;
		ranks: Array<RankInterface>;
		runes: Array<RuneInterface>;
		spells: Array<SpellInterface>;
	};
}

export interface RootState extends gameDataInterface {
	build: BuildInterface;
}
