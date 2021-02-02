import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// CSS
import styles from './landing.module.css';
// Types
interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
	lane?: string;
}

// https://material-ui.com/customization/breakpoints/

export default function Landing() {
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [championSearch, setChampionSearch] = useState('');
	const [roleFilter, setRoleFilter] = useState('all');

	// Get All Champions
	useEffect(() => {
		axios
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

	const handleChampionSearchChange = (e: any) => {
		setChampionSearch(e.target.value);
	};

	useEffect(() => {
		const filterChampions = champions.filter((champion) =>
			champion.championName.toLocaleLowerCase().includes(championSearch)
		);

		setFilteredChampions(filterChampions);
	}, [championSearch]);

	useEffect(() => {
		const filterRoles = champions.filter((champion) => {
			const { lane } = champion;

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

	return (
		<div>
			<CssBaseline />
			<Header />
			{/* <Box className={styles.callToActionContainer}>
				<Grid container>
					<Grid item xs={12} sm={6}>
						<Box>
							<p className={styles.callToActionText}>
								Get started by creating a build
							</p>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box>
							<a href='/create' style={{ textDecoration: 'none' }}>
								<Button
									variant='contained'
									size='large'
									endIcon={<ArrowRightIcon />}
								>
									Create
								</Button>
							</a>
						</Box>
					</Grid>
				</Grid>
			</Box> */}
			<Container>
				<Box className={styles.filterContainer}>
					<Grid container>
						<Grid item xs={12} sm={10}>
							<Box style={{ marginTop: '5px' }}>
								<ul className={styles.rolesList}>
									<li>
										<span onClick={() => setRoleFilter('all')}>All</span>
									</li>
									<li>
										<span onClick={() => setRoleFilter('top')}>Top</span>
									</li>
									<li onClick={() => setRoleFilter('jungle')}>Jungle</li>
									<li onClick={() => setRoleFilter('middle')}>Middle</li>
									<li onClick={() => setRoleFilter('bottom')}>Bottom</li>
									<li onClick={() => setRoleFilter('support')}>Support</li>
								</ul>
							</Box>
						</Grid>
						<Grid item xs={12} sm={2}>
							<Box>
								<TextField
									value={championSearch}
									onChange={handleChampionSearchChange}
									label='Search a Champion'
									variant='outlined'
									size='small'
								/>
							</Box>
						</Grid>
					</Grid>
				</Box>
				<Box
					display='flex'
					// justifyContent='space-between'
					flexWrap='wrap'
					className={styles.heroesContainer}
				>
					{champions && champions.length !== 0 ? (
						filteredChampions.map((champion) => {
							const { id, championName } = champion;

							return (
								<Box
									style={{
										margin: '15px 20px 0 0',
									}}
								>
									<a href={`/builds/`}>
										<LazyLoadImage
											src={`/images/wildriftchampions/${id}.png`}
											style={{ width: '90px' }}
											title={championName}
											alt={championName}
										/>
									</a>
									<p style={{ margin: 0 }}>{championName}</p>
								</Box>
							);
						})
					) : (
						<p>Loading...</p>
					)}
				</Box>
				<Footer />
			</Container>
		</div>
	);
}
