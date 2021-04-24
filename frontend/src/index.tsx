import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './shared/store/index';

import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

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
