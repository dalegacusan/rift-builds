import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import FilterBy from './components/FilterBy/FilterBy';
import Champions from './components/Champions/Champions';
// CSS
import styles from './landing.module.css';
// Types
import { ChampionInterface } from '../../utils/interfaces';
type LandingProps = {
	champions: Array<ChampionInterface>;
	setChampions(champs: Array<ChampionInterface>): void;
};

const Landing = (props: LandingProps) => {
	const { champions, setChampions } = props;
	const [championSearch, setChampionSearch] = useState('');
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [roleFilter, setRoleFilter] = useState('all');

	// Get all Champions
	useEffect(() => {
		axios
			.get('/api/champion/all')
			.then((res) => {
				const { data } = res;

				// Sort Alphabetically
				data.sort(function (a: ChampionInterface, b: ChampionInterface) {
					if (a.championName < b.championName) {
						return -1;
					}
					if (a.championName > b.championName) {
						return 1;
					}
					return 0;
				});

				setChampions([...data]);
				setFilteredChampions([...data]);
			})
			.catch((err) => {
				console.error('Something went wrong');
				console.error(err);
			});
	}, []);

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

	console.log(champions.length);

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

export default Landing;
