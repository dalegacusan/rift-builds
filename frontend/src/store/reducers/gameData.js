const actionTypes = require('../actions');

const initialState = {
	builds: [],
	champions: [],
	items: [],
	ranks: [],
	runes: [],
	spells: [],
};

const gameDataReducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.BUILD_SET_BUILDS:
			return {
				...state,
				builds: []
			};
		case actionTypes.GAMEDATA_SET_CHAMPIONS:
			return {
				...state,
				champions: action.data
			};
		case actionTypes.GAMEDATA_SET_ITEMS:
			return {
				...state,
				items: action.data
			};
		case actionTypes.GAMEDATA_SET_RANKS:
			return {
				...state,
				ranks: action.data
			};
		case actionTypes.GAMEDATA_SET_RUNES:
			return {
				...state,
				runes: action.data
			};
		case actionTypes.GAMEDATA_SET_SPELLS:
			return {
				...state,
				spells: action.data
			};
		default:
			return state;
	}

}

export default gameDataReducer;