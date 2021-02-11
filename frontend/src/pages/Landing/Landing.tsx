import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import FilterBy from './components/FilterBy/FilterBy';
import Champions from './components/Champions/Champions';
// Types
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from '../../utils/interfaces';
// CSS
import styles from './landing.module.css';

const Landing = () => {
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);

	useEffect(() => {
		axios
			.get('/api/champion/all')
			.then((res) => {
				const { data } = res;
				setChampions([...data]);
			})
			.catch((err) => {
				console.error('Something went wrong');
				console.error(err);
			});
	}, []);

	return (
		<>
			<Box style={{ backgroundColor: 'orange', padding: '10px 0' }}>
				<FilterBy />

				<Champions champions={champions} />
			</Box>
		</>
	);
};

export default Landing;
