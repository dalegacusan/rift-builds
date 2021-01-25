import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// MaterialUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
// Types
interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
}
interface ItemInterface {
	id: string;
	itemName: string;
	reason?: string;
	type: string;
	url: string;
}

interface RankInterface {
	id: string;
	rankName: string;
	url: string;
}

interface BuildInterface {
	dateSubmitted: string;
	username: string;
	champion: ChampionInterface;
	items: ItemInterface[];
	rank: RankInterface;
}

export default withRouter((props) => {
	const { match } = props;
	const [build, setBuild] = useState<BuildInterface>();

	const classes = useStyles();

	useEffect(() => {
		axios.get(`/api/build/${match.params.buildId}`).then((res) => {
			const { data } = res;
			setBuild(data);
		});
	}, []);

	console.log(build);

	return (
		<div className={classes.root}>
			<hr />
			{build ? (
				<Box
					style={{
						backgroundColor: '#233248',
						padding: '30px',
						color: '#ffffff',
					}}
				>
					<Grid container wrap='nowrap' spacing={2}>
						<Grid item>
							<img
								src={`/images/wildriftchampions/${build.champion.id}.png`}
								title={build.champion.championName}
								style={{ width: '80%', float: 'left', marginRight: '20px' }}
							/>
						</Grid>
						<Grid item xs>
							<Box>
								<Typography variant='body1'>
									<span
										style={{
											color: '#517ebd',
											fontWeight: 'bold',
											fontSize: '20px',
										}}
									>
										{build.champion.championName}
									</span>
								</Typography>
								<Typography variant='body1'>
									<span style={{ color: '#949494' }}>by</span>{' '}
									<span style={{ color: '#e9eaec' }}>{build.username}</span>
								</Typography>
							</Box>
							<Box style={{ marginTop: '10px' }}>
								<Avatar variant='square' style={{ backgroundColor: '#38465a' }}>
									{build.rank ? (
										<img
											src={`/images/wildriftranks/${build.rank.id}.png`}
											style={{
												width: '80%',
											}}
											title={build.rank.rankName}
										/>
									) : (
										<img
											src='/images/wildriftranks/a4938a79-f11f-4ee1-9ec5-7741a12c4ef9.png'
											style={{
												width: '80%',
											}}
											title='Unranked'
										/>
									)}
								</Avatar>
							</Box>
						</Grid>
					</Grid>

					{/* PRIMARY ITEMS */}
					<Box
						style={{
							backgroundColor: '#656f7e',
							color: 'black',
							margin: '20px 0',
							padding: '20px',
						}}
					>
						<Typography
							variant='subtitle1'
							style={{ fontWeight: 'bolder', color: '#e9eaec' }}
							gutterBottom
						>
							Primary Items
						</Typography>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{build.items
								.filter((item) => item.type !== 'optional')
								.map((item) => {
									const { id: itemId, itemName, type, reason, url } = item;

									return (
										<Box display='flex' p={1}>
											<Box p={1} flexGrow={1}>
												<Avatar
													variant='square'
													className={classes.large}
													style={{ float: 'left', marginRight: '10px' }}
												>
													<img
														src={`/images/wildriftitems/${itemId}.png`}
														style={{ width: '100%' }}
														title={itemName}
														alt={itemName}
													/>
												</Avatar>
												{itemName}
											</Box>
											<Box p={1} style={{ color: '#d3d6da' }}>
												{reason ? reason : 'N/A'}
											</Box>
										</Box>
									);
								})}
						</Grid>
					</Grid>

					{/* OPTIONAL ITEMS */}
					<Box
						style={{
							backgroundColor: '#656f7e',
							color: 'black',
							margin: '20px 0',
							padding: '20px',
						}}
					>
						<Typography
							variant='subtitle1'
							style={{ fontWeight: 'bolder', color: '#e9eaec' }}
							gutterBottom
						>
							Optional Items
						</Typography>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{build.items
								.filter((item) => item.type !== 'primary')
								.map((item) => {
									const { id: itemId, itemName, type, reason, url } = item;

									return (
										<Box display='flex' p={1}>
											<Box p={1} flexGrow={1}>
												<Avatar
													variant='square'
													className={classes.large}
													style={{ float: 'left', marginRight: '10px' }}
												>
													<img
														src={`/images/wildriftitems/${itemId}.png`}
														style={{ width: '100%' }}
														title={itemName}
														alt={itemName}
													/>
												</Avatar>
												{itemName}
											</Box>
											<Box p={1} style={{ color: '#d3d6da' }}>
												{reason ? reason : 'N/A'}
											</Box>
										</Box>
									);
								})}
						</Grid>
					</Grid>
					<Box display='flex' flexDirection='row-reverse' p={1} m={1}>
						<Box p={1}>
							<Typography variant='body2' style={{ color: '#B78F41' }}>
								{build.dateSubmitted
									? moment(build.dateSubmitted).format('dddd, MMMM Do YYYY')
									: 'Unknown'}
							</Typography>
						</Box>
					</Box>
				</Box>
			) : (
				<CircularProgress />
			)}
		</div>
	);
});
