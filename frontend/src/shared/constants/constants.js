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

// Build Title Length = 24
// Username length = 22
export const Validation = {
	BUILD_TITLE: {
		MIN_LENGTH: 0, // 6?
		MAX_LENGTH: 24,
	},
	USERNAME: {
		MIN_LENGTH: 0, // 6?
		MAX_LENGTH: 22,
	},
	REASON: {
		MIN_LENGTH: 0,
		MAX_LENGTH: 440,
	},
	// itemsConfirmed isn't valid if there isn't 6 primary items
	// hence the absence of MIN_LENGTH
	ITEMS: {
		MAX_LENGTH: 14,
		MAX_NUMBER_OF_PRIMARY_ITEMS: 6,
		MAX_NUMBER_OF_OPTIONAL_ITEMS: 8,
	}
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