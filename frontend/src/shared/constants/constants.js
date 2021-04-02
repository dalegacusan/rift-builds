const { REACT_APP_CLIENT_URL, REACT_APP_SERVER_URL, REACT_APP_RECAPTCHA_PUBLIC_KEY } = process.env;

export const Contact = {
	EMAIL_ADDRESS: 'abcwildrift@gmail.com'
}

export const GamePatch = {
	URL: 'https://wildrift.leagueoflegends.com/en-sg/news/game-updates/wild-rift-patch-notes-2-2/',
	VERSION: '2.2',
}

export const TierList = {
	VERSION: '2.1B',
	CREATOR_NAME: 'Sh1n Boo',
	CREATOR_URL: 'https://www.youtube.com/channel/UCTaIw3dVGxFLL8CxhOwmzkA',
	URL: 'https://www.youtube.com/post/Ugz-_9iIRB1Mbd0wuzB4AaABCQ'
}

export const URL = {
	// SERVER: REACT_APP_SERVER_URL, // PROD
	SERVER: '', // DEV
	CLIENT: REACT_APP_CLIENT_URL
}

export const ReCaptcha = {
	PUBLIC_KEY: REACT_APP_RECAPTCHA_PUBLIC_KEY
}

export const RoleFilter = {
	ALL: 'all',
	TOP: 'top',
	JUNGLE: 'jungle',
	MIDDLE: 'middle',
	BOTTOM: 'bottom',
	SUPPORT: 'support'
}

export const ItemType = {
	PRIMARY: 'primary',
	OPTIONAL: 'optional'
}

export const ItemStatus = {
	ACTIVE: 'active',
	REMOVED: 'removed'
}

export const Rune = {
	TYPE: {
		KEYSTONE: 'keystone',
		SECONDARY: 'secondary'
	},
	PATH: {
		DOMINATION: 'domination',
		RESOLVE: 'resolve',
		INSPIRATION: 'inspiration'
	}
}

export const SpellNumber = {
	SPELL_ONE: 'spellOne',
	SPELL_TWO: 'spellTwo',
}

export const GameMode = {
	ARAM: 'aram',
	NORMAL: 'normal'
}

export const GameServer = {
	SEA: 'sea',
	NA: 'na',
	EUW: 'euw'
}

export const Maps = {
	WILD_RIFT: 'wild_rift',
	HOWLING_ABYSS: 'howling_abyss',
}