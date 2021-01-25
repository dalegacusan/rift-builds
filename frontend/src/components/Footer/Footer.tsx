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
					<Grid item xs={12} md={6}>
						<Box style={{ padding: '20px' }}>
							<Typography gutterBottom>
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
							<Typography>No.</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box style={{ padding: '20px' }}>
							<p>created by ABC#DEFGH</p>
							<p>Report a Bug</p>
						</Box>
					</Grid>
				</Grid>
			</footer>
		</>
	);
}
