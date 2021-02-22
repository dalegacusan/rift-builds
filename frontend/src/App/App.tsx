import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Redux
import { connect } from 'react-redux';
import actionTypes from '../store/actions';

// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
// Components
import CreateBuild from '../pages/Create/Build/CreateBuild';
import Layout from '../components/Layout';
import Landing from '../pages/Landing/Landing';
import PageNotFound from '../components/Error/404/PageNotFound';
// Types
import {
	BuildInterface,
	ChampionInterface,
	ItemInterface,
	RuneInterface,
	SpellInterface,
	RankInterface,
	gameDataInterface,
} from '../utils/interfaces';
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
interface AppProps {
	setChampions: (prevChampions: Array<ChampionInterface>) => void;
	setItems: (prevChampions: Array<ItemInterface>) => void;
	setRunes: (prevChampions: Array<RuneInterface>) => void;
	setRanks: (prevChampions: Array<RankInterface>) => void;
	setSpells: (prevChampions: Array<SpellInterface>) => void;
}

const App = (props: AppProps) => {
	const { setChampions, setItems, setRunes, setRanks, setSpells } = props;

	// Get DATA
	useEffect(() => {
		const getChampions = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/champion/all'
			'/api/champion/all'
		);
		const getItems = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/item/all'
			'/api/item/all'
		);
		const getRunes = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/rune/all'
			'/api/rune/all'
		);
		const getSpells = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/spell/all'
			'/api/spell/all'
		);
		const getRanks = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/rank/all'
			'/api/rank/all'
		);

		Promise.all([getChampions, getItems, getRunes, getSpells, getRanks])
			.then((values) => {
				const [
					{ data: championsArray },
					{ data: itemsArray },
					{ data: runesArray },
					{ data: spellsArray },
					{ data: ranksArray },
				] = values;

				// const sortArray = (arrName, interface) => {

				// 	switch(arrName){
				// 		case 'championsArray':
				// 			return
				// 	}

				// 	return
				// }

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

				// Sort Runes
				runesArray.sort(function (a: RuneInterface, b: RuneInterface) {
					if (a.runeName < b.runeName) {
						return -1;
					}
					if (a.runeName > b.runeName) {
						return 1;
					}
					return 0;
				});

				// Sort Spells
				spellsArray.sort(function (a: SpellInterface, b: SpellInterface) {
					if (a.spellName < b.spellName) {
						return -1;
					}
					if (a.spellName > b.spellName) {
						return 1;
					}
					return 0;
				});

				setItems(itemsArray);
				setChampions(championsArray);
				setRanks(ranksArray);
				setRunes(runesArray);
				setSpells(spellsArray);
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
								<Landing />
							</Route>
							<Route exact path='/create'>
								<CreateBuild />
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		// === SETTER Champions === //
		setChampions: (champions: Array<ChampionInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_CHAMPIONS, data: champions }),
		setItems: (items: Array<ItemInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_ITEMS, data: items }),
		setRanks: (ranks: Array<RankInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_RANKS, data: ranks }),
		setRunes: (runes: Array<RuneInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_RUNES, data: runes }),
		setSpells: (spells: Array<SpellInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_SPELLS, data: spells }),
	};
};

export default connect(null, mapDispatchToProps)(App);
