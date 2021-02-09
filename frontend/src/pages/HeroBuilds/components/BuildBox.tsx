import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Components
import NoBuilds from './NoBuilds';
// Types
import { BuildInterface } from '../../../utils/interfaces';
// CSS
import styles from './buildbox.module.css';

export default function BuildBox(props: any) {
	const { championBuilds, classes } = props;

	return (
		<Box className={styles.buildContainer}>
			{championBuilds.builds.length !== 0 ? (
				championBuilds.builds.map((build: BuildInterface, index: number) => {
					const {
						id: buildId,
						champion,
						dateSubmitted,
						items,
						rank,
						runes,
						spells,
						username,
					}: BuildInterface = build;
					const { id: championId, championName, url } = champion;

					var originalDate = moment(dateSubmitted);
					var dateToday = moment(Date());

					return (
						<div className={classes.root}>
							<Paper className={classes.paper}>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={2}>
										<Typography>
											{originalDate.diff(dateToday, 'days')} days ago
										</Typography>
									</Grid>

									{/* CHAMPION AVATAR */}
									<Grid item xs={2} sm={1}>
										<Box>
											<Avatar>
												<LazyLoadImage
													src={`/images/wildriftchampions/${championId}.png`}
													className={styles.championImage}
													title={championName}
													alt={championName}
												/>
											</Avatar>
										</Box>
									</Grid>

									{/* ITEMS */}
									<Grid item xs={10} sm={3}>
										<Box style={{ minHeight: '35px' }}>
											{items
												.filter((item) => item.type !== 'optional')
												.map((item) => {
													const { id: itemId, itemName } = item;

													return (
														<>
															<LazyLoadImage
																src={`/images/wildriftitems/${itemId}.png`}
																style={{
																	width: '36px',
																	marginRight: '6px',
																}}
																alt={itemName}
																title={itemName}
															/>
														</>
													);
												})}
										</Box>
									</Grid>

									{/* SPELLS */}
									<Grid item xs={4} sm={1}>
										<Box>
											{spells.map((spell) => {
												const { id: spellId, spellName } = spell;

												return (
													<>
														<Box style={{ display: 'inline-block' }}>
															<LazyLoadImage
																src={`/images/wildriftspells/${spellId}.jpg`}
																style={{ width: '36px', marginRight: '6px' }}
																alt={spellName}
																title={spellName}
															/>
														</Box>
													</>
												);
											})}
										</Box>
									</Grid>

									{/* RANK */}
									<Grid item xs={8} sm={3}>
										<Box style={{ display: 'inline-block' }}>
											{rank ? (
												<LazyLoadImage
													src={`/images/wildriftranks/${rank.id}.png`}
													style={{
														width: '31px',
														marginRight: '6px',
													}}
													title={rank.rankName}
													alt={rank.rankName}
												/>
											) : (
												<LazyLoadImage
													src='/images/wildriftranks/a4938a79-f11f-4ee1-9ec5-7741a12c4ef9.png'
													style={{
														width: '31px',
														marginRight: '6px',
													}}
													title='Unranked'
													alt='Unranked'
												/>
											)}
										</Box>
										<Typography style={{ display: 'inline-block' }}>
											Username
										</Typography>
									</Grid>

									{/* LEARN MORE BUTTON */}
									<Grid item xs={12} sm={2}>
										<Box>
											<a
												// href={`https://wildriftbuilds.herokuapp.com/build/${buildId}`}
												href={`/build/${buildId}`}
											>
												<Button variant='contained' color='primary'>
													Learn more
												</Button>
											</a>
										</Box>
									</Grid>
								</Grid>
							</Paper>
						</div>
					);
				})
			) : (
				// No Builds
				<NoBuilds />
			)}
		</Box>
	);
}
