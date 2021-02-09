import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MaterialUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// Components
import Filter from './components/Filter';
import ChampionList from './components/ChampionsList';
import LoadingText from '../../components/LoadingText';
// Types
import { ChampionInterface } from '../../utils/interfaces';
// CSS
import styles from './landing.module.css';

export default function Landing() {
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [championSearch, setChampionSearch] = useState('');
	const [roleFilter, setRoleFilter] = useState('all');

	// Get ALL CHAMPIONS and Sort Alphabetically
	useEffect(() => {
		axios
			// .get('https://wildriftbuilds.herokuapp.com/api/champion/all')
			.get('/api/champion/all')
			.then((res) => {
				const { data } = res;

				data.sort(function (a: ChampionInterface, b: ChampionInterface) {
					if (a.championName < b.championName) {
						return -1;
					}
					if (a.championName > b.championName) {
						return 1;
					}
					return 0;
				});

				setChampions(data);
				setFilteredChampions(data);
			})
			.catch((err) => {
				console.error('Something went wrong');
				console.error(err);
			});
	}, []);

	// Handler for "Search for a champion" input
	useEffect(() => {
		const filterChampions = champions.filter((champion) =>
			champion.championName.toLocaleLowerCase().includes(championSearch)
		);

		setFilteredChampions(filterChampions);
	}, [championSearch]);

	// Handler for Role Filter by "All, Top, Jungle, Middle, Bottom, Support"
	useEffect(() => {
		const filterRoles = champions.filter((champion) => {
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

	const handleChampionSearchChange = (e: any) => {
		setChampionSearch(e.target.value);
	};

	return (
		<div>
			<Container>
				{/* Filter by */}
				<Filter
					setRoleFilter={setRoleFilter}
					championSearch={championSearch}
					handleChampionSearchChange={handleChampionSearchChange}
				/>

				{/* Heroes List */}
				<Box display='flex' flexWrap='wrap' className={styles.heroesContainer}>
					{champions && champions.length !== 0 ? (
						filteredChampions.map((champion, index) => {
							const { id: championId, championName } = champion;

							return (
								<ChampionList
									key={index}
									championId={championId}
									championName={championName}
								/>
							);
						})
					) : (
						<LoadingText />
					)}
				</Box>
			</Container>
		</div>
	);
}
