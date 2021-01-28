import React from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// Components
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));
//Types

export default function Header() {
	const classes = useStyles();

	return (
		<>
			<hr />
			<footer className={classes.root}>
				<Grid container>
					<Grid item xs>
						<Box>
							<ul style={{ display: 'inline', listStyleType: 'none' }}>
								<li>
									<Typography variant='body2' gutterBottom>
										created by ABC#DEFGH
									</Typography>
								</li>
								<li>
									<Typography variant='body2' gutterBottom>
										Report a Bug
									</Typography>
								</li>
							</ul>
						</Box>
						<Box>
							{/* <Typography gutterBottom>
								<b>FAQ</b>
							</Typography>
							<Typography>
								<b>Tell me more about this</b>
							</Typography>
							<Typography gutterBottom>
								It's a platform where players can share their builds to the
								community. Get started by <a href='/create'>creating a build</a>
							</Typography>
							<Typography>
								<b>
									Is this directly related to RIOT Games or League of Legends:
									Wild Rift?
								</b>
							</Typography>
							<Typography>No.</Typography> */}
							<Typography variant='body2' gutterBottom>
								© 2021 WR.CB. WR.CB isn’t endorsed by Riot Games and doesn’t
								reflect the views or opinions of Riot Games or anyone officially
								involved in producing or managing League of Legends. League of
								Legends and Riot Games are trademarks or registered trademarks
								of Riot Games, Inc. League of Legends © Riot Games, Inc.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</footer>
		</>
	);
}
