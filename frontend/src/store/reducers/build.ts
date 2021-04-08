import { AnyAction } from 'redux';
import actionTypes from '../actions';
const { GamePatch } = require('../../shared/constants/constants');
const {
	DefaultSelectedState,
} = require('../../shared/constants/defaultSelectedState');

const initialState = {
	buildTitle: '',
	buildRole: DefaultSelectedState.ROLE,
	champion: DefaultSelectedState.CHAMPION,
	description: '',
	gameMode: DefaultSelectedState.GAMEMODE,
	itemsConfirmed: [],
	patchVersion: GamePatch.VERSION,
	rank: DefaultSelectedState.RANK,
	runes: DefaultSelectedState.RUNES,
	region: DefaultSelectedState.REGION,
	spells: DefaultSelectedState.SPELLS,
	username: '',
};

const buildReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.BUILD_SET_BUILDTITLE:
			return {
				...state,
				buildTitle: action.data,
			};
		case actionTypes.BUILD_SET_BUILDROLE:
			return {
				...state,
				buildRole: action.data,
			};
		case actionTypes.BUILD_SET_CHAMPIONSELECTED:
			return {
				...state,
				champion: action.data,
			};
		case actionTypes.BUILD_SET_DESCRIPTION:
			return {
				...state,
				description: action.data,
			};
		case actionTypes.BUILD_SET_GAMEMODE:
			return {
				...state,
				gameMode: action.data,
			};
		case actionTypes.BUILD_SET_ITEMSCONFIRMED:
			return {
				...state,
				itemsConfirmed: action.data,
			};
		case actionTypes.BUILD_SET_RUNESSELECTED:
			return {
				...state,
				runes: action.data,
			};
		case actionTypes.BUILD_SET_REGION:
			return {
				...state,
				region: action.data,
			};
		case actionTypes.BUILD_SET_SPELLSSELECTED:
			return {
				...state,
				spells: {
					...state.spells,
					[action.spellKey]: action.data,
				},
			};
		case actionTypes.BUILD_RESET_SPELLSSELECTED:
			return {
				...state,
				spells: DefaultSelectedState.SPELLS,
			};
		case actionTypes.BUILD_SET_RANKSELECTED:
			return {
				...state,
				rank: action.data,
			};
		case actionTypes.BUILD_SET_USERNAME:
			return {
				...state,
				username: action.data,
			};
		case actionTypes.BUILD_RESET:
			return initialState;
		default:
			return state;
	}
};

export default buildReducer;
