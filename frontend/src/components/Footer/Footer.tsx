import React from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// Components
// CSS
import styles from './footer.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));
//Types

const Footer = () => {
	const classes = useStyles();

	return (
		<>
			<footer className={classes.root}>
				<Grid container>
					<Grid item xs>
						<Box style={{ padding: '80px 0' }}>
							<Box style={{ paddingBottom: '20px' }}>
								<a href='/' className={styles.footerLink}>
									FAQ
								</a>
								<a href='/' className={styles.footerLink}>
									Feedback
								</a>
								<a href='/create' className={styles.footerLink}>
									Report a Bug
								</a>
							</Box>
							<Box>
								<Typography variant='body2' gutterBottom>
									© 2021 Rift Builds. Rift Builds isn’t endorsed by Riot Games
									and doesn’t reflect the views or opinions of Riot Games or
									anyone officially involved in producing or managing League of
									Legends. League of Legends and Riot Games are trademarks or
									registered trademarks of Riot Games, Inc. League of Legends ©
									Riot Games, Inc.
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</footer>
		</>
	);
};

export default Footer;
