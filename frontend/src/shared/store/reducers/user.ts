import { AnyAction } from 'redux';
import actionTypes from '../actions';

const initialState = null;

const userReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return action.data;

		default:
			return state;
	}
};

export default userReducer;
