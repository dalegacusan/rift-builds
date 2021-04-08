import { AnyAction } from 'redux';
import actionTypes from '../actions';

const initialState = {
	message: '',
	shouldOpen: false,
	snackbarType: '',
};

const snackbarControlsReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.SNACKBAR_SET_CONTROLS:
			return action.data;

		default:
			return state;
	}
};

export default snackbarControlsReducer;
