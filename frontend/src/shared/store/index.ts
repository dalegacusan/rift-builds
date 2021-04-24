// Redux
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import buildReducer from './reducers/build';
import gameDataReducer from './reducers/gameData';
import recaptchaReducer from './reducers/reCaptcha';
import snackbarControlsReducer from './reducers/snackbarControls';

const persistConfig = {
	key: 'root',
	storage: storage,
};

const rootReducer = combineReducers({
	build: buildReducer,
	gameData: gameDataReducer,
	recaptcha: recaptchaReducer,
	snackbarControls: snackbarControlsReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer);

const persistor = persistStore(store);

export { store, persistor };
