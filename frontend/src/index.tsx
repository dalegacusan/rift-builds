import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import buildReducer from './store/reducers/build';
import gameDataReducer from './store/reducers/gameData';
import recaptchaReducer from './store/reducers/reCaptcha';
import snackbarControlsReducer from './store/reducers/snackbarControls';

import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

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

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
			<App />
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
