import ReCAPTCHA from 'react-google-recaptcha';
const actionTypes = require('../actions');

const initialState = {
	recaptchaRef: ReCAPTCHA,
	recaptchaToken: '',
}

const recaptchaReducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.RECAPTCHA_SET_REF:
			return {
				...state,
				recaptchaRef: action.data
			}
		case actionTypes.RECAPTCHA_SET_TOKEN:
			return {
				...state,
				recaptchaToken: action.data
			}
		default:
			return state;
	}

}

export default recaptchaReducer;