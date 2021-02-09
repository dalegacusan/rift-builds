import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
// Components
import Layout from '../../components/Layout';
import Landing from '../Landing/Landing';
import HeroBuilds from '../HeroBuilds/HeroBuilds';
import CreateBuild from '../Create/Build/CreateBuild';
import PlayerBuild from '../PlayerBuild/PlayerBuild';
// Types
// CSS
const theme = createMuiTheme({
	typography: {
		fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'Tahoma'].join(','),
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<CssBaseline />
				<Router>
					<Switch>
						<Layout>
							<Route exact path='/' render={() => <Landing />} />

							<Route
								exact
								path='/builds/:championId'
								render={() => <HeroBuilds />}
							/>

							<Route exact path='/create' render={() => <CreateBuild />} />

							<Route
								exact
								path='/build/:buildId'
								render={() => <PlayerBuild />}
							/>
						</Layout>
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
}
