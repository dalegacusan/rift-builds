const { GamePatch } = require('../../shared/constants/constants');
const { DefaultSelectedState } = require('../../shared/constants/defaultSelectedState');
const actionTypes = require('../actions');

const initialState = {
	buildTitle: '',
	buildRole: DefaultSelectedState.ROLE,
	champion: DefaultSelectedState.CHAMPION,
	itemsConfirmed: [],
	patchVersion: GamePatch.VERSION,
	rank: DefaultSelectedState.RANK,
	runes: DefaultSelectedState.RUNES,
	spells: DefaultSelectedState.SPELLS,
	username: '',
}

const buildReducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.BUILD_SET_BUILDTITLE:
			return {
				...state,
				buildTitle: action.data
			};
		case actionTypes.BUILD_SET_BUILDROLE:
			return {
				...state,
				buildRole: action.data
			};
		case actionTypes.BUILD_SET_CHAMPIONSELECTED:
			return {
				...state,
				champion: action.data
			};
		case actionTypes.BUILD_SET_ITEMSCONFIRMED:
			return {
				...state,
				itemsConfirmed: action.data
			};
		case actionTypes.BUILD_SET_RUNESSELECTED:
			return {
				...state,
				runes: action.data
			};
		case actionTypes.BUILD_SET_SPELLSSELECTED:
			return {
				...state,
				spells: {
					...state.spells,
					[action.spellKey]: action.data
				}
			};
		case actionTypes.BUILD_SET_RANKSELECTED:
			return {
				...state,
				rank: action.data
			};
		case actionTypes.BUILD_SET_USERNAME:
			return {
				...state,
				username: action.data
			};
		case actionTypes.BUILD_RESET:
			return initialState
		default:
			return state;
	}

}

export default buildReducer;