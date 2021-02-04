import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

interface ItemInterface {
	id: string;
	itemName: string;
	reason?: string;
	type: string;
	url: string;
}

interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
	lane: Array<String>;
	title: string;
}

interface RankInterface {
	id: string;
	rankName: string;
	url: string;
}

interface RuneInterface {
	id: string;
	runeName: string;
	url: string;
	type: string;
	path?: string;
}

interface SpellInterface {
	id: string;
	spellName: string;
	url: string;
}

interface BuildInterface {
	id: string;
	username: string;
	champion: ChampionInterface;
	items: ItemInterface[];
	rank: RankInterface;
	runes: RuneInterface;
	spells: SpellInterface;
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
	},
	paper: {
		width: '100%',
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2),
		backgroundColor: '#233248',
		color: '#ffffff',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

export default withRouter((props) => {
	const { match } = props;
	const { championId } = match.params;

	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);
	const [championData, setChampionData] = useState<ChampionInterface>({
		id: '',
		championName: '',
		url: '',
		lane: [],
		title: '',
	});
	const [championBuilds, setChampionBuilds] = useState({
		builds: [],
		count: 0,
	});

	useEffect(() => {
		const getAllBuildsForChampion = axios.post(
			// `/api/build/${match.params.buildId}`
			`/api/build/all/${championId}`,
			{ page: 5 }
		);

		const getChampionData = axios.get(`/api/champion/${championId}`);

		Promise.all([getAllBuildsForChampion, getChampionData]).then((values) => {
			const [{ data: championBuildsResponse }, { data: championData }] = values;
			const { count, builds } = championBuildsResponse;

			setChampionBuilds({ builds, count });
			setChampionData(championData[0]);

			setIsLoading(false);
		});
	}, []);

	return (
		<div>
			<Container>
				<Box
					style={{
						// backgroundColor: '#cccccc',
						margin: '30px 0',
						padding: '20px 0',
					}}
				>
					{!isLoading ? (
						<>
							<Grid container wrap='nowrap' spacing={2}>
								<Grid item>
									<LazyLoadImage
										src={`/images/wildriftchampions/${championData.id}.png`}
										alt={championData.championName}
										title={championData.championName}
										style={{ float: 'left' }}
									/>
								</Grid>
								<Grid item xs>
									<Box style={{ padding: '5px 0' }}>
										<Typography variant='body1'>
											<span
												style={{
													color: '#517ebd',
													fontWeight: 'bold',
													fontSize: '20px',
												}}
											>
												{championData.championName}
											</span>
										</Typography>
										<Typography variant='body1'>
											<span style={{ color: '#949494' }}>
												The {championData.title}
											</span>
										</Typography>
									</Box>
									<Box
										style={{
											marginTop: '17px',
										}}
									>
										{championData.lane.map((lane) => {
											return (
												<Chip
													label={lane}
													color='primary'
													style={{ marginRight: '4px' }}
												/>
											);
										})}
									</Box>
								</Grid>
							</Grid>

							<Divider variant='middle' />

							{/* Builds List Container */}
							<Box style={{ padding: '20px 0' }}>
								<Typography variant='body1'>
									<span style={{ fontWeight: 'bold', fontSize: '18px' }}>
										{championBuilds.count} {championData.championName} builds
									</span>
								</Typography>

								<Box>
									{championBuilds.builds.length !== 0 ? (
										championBuilds.builds.map((build, index) => {
											const {
												id: buildId,
												username,
												items,
												champion,
												rank,
											}: BuildInterface = build;
											const { id: championId, championName, url } = champion;

											return (
												<div className={classes.root}>
													<Paper className={classes.paper}>
														<Grid container wrap='nowrap' spacing={2}>
															<Grid item>
																<Avatar className={classes.large}>
																	<LazyLoadImage
																		src={`/images/wildriftchampions/${championId}.png`}
																		style={{ width: '100%' }}
																		title={championName}
																		alt={championName}
																	/>
																</Avatar>
															</Grid>
															<Grid item xs>
																<Box display='flex'>
																	<Box flexGrow={1}>
																		<Typography variant='body1'>
																			<span
																				style={{
																					color: '#517ebd',
																					fontWeight: 'bold',
																					fontSize: '20px',
																				}}
																			>
																				{championName}
																			</span>
																		</Typography>
																		<Typography variant='body1'>
																			<span style={{ color: '#949494' }}>
																				by
																			</span>{' '}
																			<span style={{ color: '#e9eaec' }}>
																				{username}
																			</span>
																		</Typography>
																	</Box>
																	<Box>
																		<Avatar
																			className={classes.large}
																			style={{ backgroundColor: '#38465a' }}
																		>
																			{rank ? (
																				<LazyLoadImage
																					src={`/images/wildriftranks/${rank.id}.png`}
																					style={{
																						width: '80%',
																					}}
																					title={rank.rankName}
																					alt={rank.rankName}
																				/>
																			) : (
																				<LazyLoadImage
																					src='/images/wildriftranks/a4938a79-f11f-4ee1-9ec5-7741a12c4ef9.png'
																					style={{
																						width: '80%',
																					}}
																					title='Unranked'
																					alt='Unranked'
																				/>
																			)}
																		</Avatar>
																	</Box>
																</Box>
															</Grid>
														</Grid>
														<Box style={{ marginTop: '30px' }}>
															{items
																.filter((item) => item.type !== 'optional')
																.map((item) => {
																	const { id: itemId, itemName } = item;

																	return (
																		<>
																			<Box style={{ display: 'inline-block' }}>
																				<LazyLoadImage
																					src={`/images/wildriftitems/${itemId}.png`}
																					style={{ width: '50px' }}
																					alt={itemName}
																					title={itemName}
																				/>
																			</Box>
																		</>
																	);
																})}
														</Box>
														<Box
															display='flex'
															flexDirection='row-reverse'
															style={{ margin: '20px 0 0 0' }}
														>
															<a
																// href={`https://wildriftbuilds.herokuapp.com/build/${buildId}`}
																href={`/build/${buildId}`}
															>
																<Button variant='contained' color='primary'>
																	Learn more
																</Button>
															</a>
														</Box>
													</Paper>
												</div>
											);
										})
									) : (
										<Box
											style={{
												backgroundColor: '#f5f5f5',
												padding: '40px',
												margin: '20px 0',
											}}
											display='flex'
											justifyContent='center'
										>
											<Box>
												<LazyLoadImage
													src='/images/no_data.svg'
													width='120'
													style={{
														display: 'block',
														marginLeft: 'auto',
														marginRight: 'auto',
														margin: '0 auto 30px auto',
													}}
												/>
												<Typography gutterBottom>
													There are no builds for this champion yet.{' '}
													<a
														href='/create'
														style={{ color: '#517ebd', textDecoration: 'none' }}
													>
														Create a build
													</a>
												</Typography>
											</Box>
										</Box>
									)}
								</Box>
							</Box>
						</>
					) : (
						<p>Loading</p>
					)}
				</Box>
			</Container>
		</div>
	);
});
