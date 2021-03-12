const { REACT_APP_NETLIFY_URL, REACT_APP_SERVER_URL, REACT_APP_RECAPTCHA_PUBLIC_KEY } = process.env;

const patchVersion = '2.1A';
const patchNotesURL = 'https://wildrift.leagueoflegends.com/en-sg/news/game-updates/wild-rift-patch-notes-2-1a/';

// === TIER LIST DATA === //
const tierListCreatorName = 'Excoundrel';
const tierListCreatorURL =
	'https://www.youtube.com/channel/UCpImC3RB9PdFzR0GamyJznQ';
const tierListURL = 'https://www.youtube.com/watch?v=JpUJyqZ_9XY';

// === CONTACT DATA === //
const contactEmailAddress = 'abcwildrift@gmail.com';

// === SERVER === //
const serverURL = REACT_APP_SERVER_URL; // PROD
// const serverURL = ''; // DEV

// === NETLIFY === //
const netlifyURL = REACT_APP_NETLIFY_URL;

// === SECRETS === //
const recaptchaPublicKey = REACT_APP_RECAPTCHA_PUBLIC_KEY;

module.exports = {
	patchVersion,
	patchNotesURL,
	// === TIER LIST DATA === //
	tierListCreatorName,
	tierListCreatorURL,
	tierListURL,
	// === CONTACT DATA === //
	contactEmailAddress,
	// === SERVER === //
	serverURL,
	// === NETLIFY === //
	netlifyURL,
	// === SECRETS === //
	recaptchaPublicKey,
}