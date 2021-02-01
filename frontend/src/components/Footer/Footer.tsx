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
							<Typography variant='body2' gutterBottom>
								Feedback
							</Typography>
							<Typography variant='body2' gutterBottom>
								Report a Bug
							</Typography>
						</Box>
						<Typography variant='body2' gutterBottom>
							© 2021 Rift Builds. Rift Builds isn’t endorsed by Riot Games and
							doesn’t reflect the views or opinions of Riot Games or anyone
							officially involved in producing or managing League of Legends.
							League of Legends and Riot Games are trademarks or registered
							trademarks of Riot Games, Inc. League of Legends © Riot Games,
							Inc.
						</Typography>
					</Grid>
				</Grid>
			</footer>
		</>
	);
}
