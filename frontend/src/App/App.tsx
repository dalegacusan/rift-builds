import React, { useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Redux
import { connect } from 'react-redux';
import actionTypes from '../shared/store/actions';

// Shared

import {
	getChampions,
	getItems,
	getRunes,
	getSpells,
	getRanks,
	getRoles,
	sortChampionsAlphabetically,
	sortItemsAlphabetically,
	sortRunesAlphabetically,
	sortSpellsAlphabetically,
} from '../shared/services/gameDataRequests';

// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Layout from '../shared/components/PageLayout/Layout';
import Routes from './Routes';

// Types
import {
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from '../shared/interfaces/GameData';

// CSS
import styles from './app.module.css';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'Tahoma'].join(','),
	},
	palette: {
		primary: {
			light: '#FAFAFA',
			main: '#13AAFF',
			dark: '#5893D4',
		},
		secondary: {
			light: '#292E38',
			main: '#5893D4',
			dark: '#171717',
		},
	},
});

type AppProps = {
	setChampions: (newChampions: Array<ChampionInterface>) => void;
	setItems: (newItems: Array<ItemInterface>) => void;
	setRanks: (newRanks: Array<RankInterface>) => void;
	setRoles: (newRoles: Array<RoleInterface>) => void;
	setRunes: (newRunes: Array<RuneInterface>) => void;
	setSpells: (newSpells: Array<SpellInterface>) => void;
};

const App = (props: AppProps) => {
	const {
		setChampions,
		setItems,
		setRanks,
		setRunes,
		setRoles,
		setSpells,
	} = props;

	// Get Game Data
	useEffect(() => {
		Promise.all([
			getChampions,
			getItems,
			getRunes,
			getSpells,
			getRanks,
			getRoles,
		])
			.then((values) => {
				let [
					{ data: championsArray },
					{ data: itemsArray },
					{ data: runesArray },
					{ data: spellsArray },
					{ data: ranksArray },
					{ data: rolesArray },
				] = values;

				// Sort Champions
				championsArray = sortChampionsAlphabetically(championsArray);

				// Sort Items
				itemsArray = sortItemsAlphabetically(itemsArray);

				// Sort Runes
				runesArray = sortRunesAlphabetically(runesArray);

				// Sort Spells
				spellsArray = sortSpellsAlphabetically(spellsArray);

				setItems(itemsArray);
				setChampions(championsArray);
				setRanks(ranksArray);
				setRunes(runesArray);
				setSpells(spellsArray);
				setRoles(rolesArray);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${styles.appContainer}`}>
				<CssBaseline />
				<Layout>
					<Routes />
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
		setRoles: (roles: Array<RoleInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_ROLES, data: roles }),
		setRunes: (runes: Array<RuneInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_RUNES, data: runes }),
		setSpells: (spells: Array<SpellInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_SPELLS, data: spells }),
	};
};

export default connect(null, mapDispatchToProps)(App);
