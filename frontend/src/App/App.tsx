import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { ChampionInterface, ItemInterface } from '../utils/interfaces';
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
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);
	const [items, setItems] = useState<Array<ItemInterface>>([]);

	// Get all Champions
	useEffect(() => {
		const getChampions = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/champion/all'
			'/api/champion/all'
		);
		const getItems = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/item/all'
			'/api/item/all'
		);

		Promise.all([getChampions, getItems])
			.then((values) => {
				const [{ data: championsArray }, { data: itemsArray }] = values;

				// Sort Champions Alphabetically
				championsArray.sort(function (
					a: ChampionInterface,
					b: ChampionInterface
				) {
					if (a.championName < b.championName) {
						return -1;
					}
					if (a.championName > b.championName) {
						return 1;
					}
					return 0;
				});

				// Sort Items Alphabetically
				itemsArray.sort(function (a: ItemInterface, b: ItemInterface) {
					if (a.itemName < b.itemName) {
						return -1;
					}
					if (a.itemName > b.itemName) {
						return 1;
					}
					return 0;
				});

				setItems(itemsArray);
				setChampions(championsArray);
			})
			.catch((err) => {
				console.error('Something went wrong');
				console.error(err);
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<CssBaseline />
				<Layout>
					<Router>
						<Switch>
							<Route exact path='/'>
								<Landing champions={champions} setChampions={setChampions} />
							</Route>
							<Route exact path='/create'>
								<CreateBuild champions={champions} items={items} />
							</Route>

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
