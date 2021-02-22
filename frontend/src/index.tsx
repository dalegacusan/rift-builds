import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import buildReducer from './store/reducers/build';
import gameDataReducer from './store/reducers/gameData';

import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
	build: buildReducer,
	gameData: gameDataReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
