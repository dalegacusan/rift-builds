import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Components
import BuildBox from './components/BuildBox';
import LoadingText from '../../components/LoadingText';
// Types
import { ChampionInterface, BuildInterface } from '../../utils/interfaces';
// CSS
import styles from './herobuilds.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
	},
	paper: {
		width: '100%',
		margin: `${theme.spacing(1)}px auto`,
		padding: '10px',
		backgroundColor: '#292E38',
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
	const [championBuilds, setChampionBuilds] = useState({
		builds: [],
		buildsCount: 0,
	});
	const [championData, setChampionData] = useState<ChampionInterface>({
		id: '',
		championName: '',
		lane: [],
		title: '',
		counters: {
			weakAgainst: [],
			strongAgainst: [],
		},
		url: '',
	});

	useEffect(() => {
		const getAllBuildsForChampion = axios.post(
			// `/api/build/${match.params.buildId}`
			`/api/build/all/${championId}`,
			{ page: 5 }
		);
		const getOneChampion = axios.get(`/api/champion/${championId}`);

		Promise.all([getAllBuildsForChampion, getOneChampion]).then((values) => {
			const [{ data: buildsForChampion }, { data: dataForChampion }] = values;
			const { buildsCount, builds } = buildsForChampion;

			setChampionBuilds({ builds, buildsCount });
			setChampionData(dataForChampion[0]);

			setIsLoading(false);
		});
	}, []);

	return (
		<Container>
			<Box
				style={{
					margin: '30px 0',
					padding: '20px 0',
				}}
			>
				<Typography variant='body1'>
					<span style={{ fontWeight: 'bold', fontSize: '18px' }}>
						{championBuilds.buildsCount} {championData.championName} builds
					</span>
				</Typography>

				{!isLoading ? (
					<>
						{/* Champion Data HEADER */}
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
						<BuildBox
							championBuilds={championBuilds}
							championData={championData}
							classes={classes}
						/>
					</>
				) : (
					<LoadingText />
				)}
			</Box>
		</Container>
	);
});
