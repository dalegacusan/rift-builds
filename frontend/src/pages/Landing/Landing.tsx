import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import FilterBy from './components/FilterBy/FilterBy';
import Champions from './components/Champions/Champions';
// CSS
import styles from './landing.module.css';
// Types
import { ChampionInterface, RootState } from '../../utils/interfaces';

const Landing = (props: LandingProps) => {
	// Game Data PROPS
	const { champions } = props;

	const [championSearch, setChampionSearch] = useState('');
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [roleFilter, setRoleFilter] = useState('all');

	useEffect(() => {
		setFilteredChampions(champions);
	}, [champions]);

	// Change state based on "All, Top, Jungle, Middle, Bottom, Support"
	useEffect(() => {
		const filterRoles = champions.filter((champion: ChampionInterface) => {
			const { lane } = champion;

			// Check if champion has "lane" property
			if (lane) {
				if (roleFilter === 'all') {
					return champion;
				} else {
					for (let i = 0; i < lane.length; i++) {
						if (lane[i].toLocaleLowerCase() === roleFilter) {
							return champion;
						}
					}
				}
			}
		});

		setFilteredChampions(filterRoles);
	}, [roleFilter]);

	// Change state based on "Search for a champion"
	useEffect(() => {
		const filterChampions = champions.filter((champion: ChampionInterface) =>
			champion.championName.toLocaleLowerCase().includes(championSearch)
		);

		setFilteredChampions(filterChampions);
	}, [championSearch]);

	// HANDLER for "Search for a champion" input
	const handleChampionSearchChange = (
		e: React.ChangeEvent<HTMLInputElement> // ChangeEvent more suitable for typing form events.
	) => {
		const { value } = e.target;
		setChampionSearch(value);
	};

	return (
		<>
			<Box className={styles.landingContainer}>
				<FilterBy
					championSearch={championSearch}
					handleChampionSearchChange={handleChampionSearchChange}
					setRoleFilter={setRoleFilter}
				/>

				{champions.length !== 0 ? (
					<Champions filteredChampions={filteredChampions} />
				) : (
					<p>Loading champions...</p>
				)}
			</Box>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		champions: state.gameData.champions,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setChampions: (data: Array<ChampionInterface>) =>
			dispatch({ type: actionTypes.GAMEDATA_SET_CHAMPIONS, data }),
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LandingProps = PropsFromRedux;

export default connector(Landing);
