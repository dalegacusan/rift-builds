import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { connect, ConnectedProps } from 'react-redux';
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
import { useQueriesTyped } from '../shared/services/useQueriesTyped';

// MaterialUI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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

const App = (props: AppProps) => {
	const { setChampions, setItems, setRanks, setRunes, setRoles, setSpells } =
		props;

	const gameDataQueries = useQueriesTyped([
		{ queryKey: 'champions', queryFn: () => getChampions },
		{ queryKey: 'items', queryFn: () => getItems },
		{ queryKey: 'runes', queryFn: () => getRunes },
		{ queryKey: 'spells', queryFn: () => getSpells },
		{ queryKey: 'ranks', queryFn: () => getRanks },
		{ queryKey: 'roles', queryFn: () => getRoles },
	]);

	const eachQueryHasLoaded = gameDataQueries.every(
		(query) => !query.isLoading && query.isSuccess
	);

	useEffect(() => {
		if (eachQueryHasLoaded) {
			const [
				{ data: champions },
				{ data: items },
				{ data: runes },
				{ data: spells },
				{ data: ranks },
				{ data: roles },
			] = gameDataQueries;

			// Sort Champions
			const championsArray: Array<ChampionInterface> =
				sortChampionsAlphabetically(champions?.data);

			// Sort Items
			const itemsArray: Array<ItemInterface> = sortItemsAlphabetically(
				items?.data
			);

			// Sort Runes
			const runesArray: Array<RuneInterface> = sortRunesAlphabetically(
				runes?.data
			);

			// Sort Spells
			const spellsArray: Array<SpellInterface> = sortSpellsAlphabetically(
				spells?.data
			);

			const ranksArray: Array<RankInterface> = ranks?.data;

			const rolesArray: Array<RoleInterface> = roles?.data;

			setChampions(championsArray);
			setItems(itemsArray);
			setRanks(ranksArray);
			setRunes(runesArray);
			setSpells(spellsArray);
			setRoles(rolesArray);
		}
	}, [eachQueryHasLoaded]);

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${styles.appContainer}`}>
				<CssBaseline />
				<BrowserRouter>
					<Layout>
						<Routes />
					</Layout>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

const mapDispatchToProps = (dispatch: any) => {
	return {
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

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux & {
	setChampions: (newChampions: Array<ChampionInterface>) => void;
	setItems: (newItems: Array<ItemInterface>) => void;
	setRanks: (newRanks: Array<RankInterface>) => void;
	setRoles: (newRoles: Array<RoleInterface>) => void;
	setRunes: (newRunes: Array<RuneInterface>) => void;
	setSpells: (newSpells: Array<SpellInterface>) => void;
};

export default connect(null, mapDispatchToProps)(App);
