const { REACT_APP_CLIENT_URL, REACT_APP_SERVER_URL, REACT_APP_RECAPTCHA_PUBLIC_KEY } = process.env;

export const Contact = {
	EMAIL_ADDRESS: 'abcwildrift'
}

export const GamePatch = {
	URL: 'https://wildrift.leagueoflegends.com/en-sg/news/game-updates/wild-rift-patch-notes-2-1b/',
	VERSION: '2.1B',
}

export const TierList = {
	CREATOR_NAME: 'Sh1n Boo',
	CREATOR_URL: 'https://www.youtube.com/channel/UCTaIw3dVGxFLL8CxhOwmzkA',
	URL: 'https://www.youtube.com/post/Ugz-_9iIRB1Mbd0wuzB4AaABCQ'
}

export const URL = {
	// URL: REACT_APP_SERVER_URL, // PROD
	SERVER: '', // DEV
	CLIENT: REACT_APP_CLIENT_URL
}

export const ReCaptcha = {
	PUBLIC_KEY: REACT_APP_RECAPTCHA_PUBLIC_KEY
}