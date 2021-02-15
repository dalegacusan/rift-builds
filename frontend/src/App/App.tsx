import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
// Components
import CreateBuild from '../pages/Create/Build/CreateBuild';
import Layout from '../components/Layout';
import Landing from '../pages/Landing/Landing';
import PageNotFound from '../components/Error/404/PageNotFound';
// Types
// CSS
const theme = createMuiTheme({
	typography: {
		fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'Tahoma'].join(','),
	},
	palette: {
		primary: {
			light: '#FAFAFA',
			main: '#00A3FE',
			dark: '#326CAC',
		},
		secondary: {
			light: '#292E38',
			main: '#242424',
			dark: '#171717',
		},
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<CssBaseline />
				<Layout>
					<Router>
						<Switch>
							<Route exact path='/' component={Landing} />
							<Route exact path='/create' component={CreateBuild} />

							{/* 404 - Page not found */}
							<Route component={PageNotFound} />
						</Switch>
					</Router>
				</Layout>
			</div>
		</ThemeProvider>
	);
};

export default App;
