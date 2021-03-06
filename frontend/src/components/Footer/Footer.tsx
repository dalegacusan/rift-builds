import React from 'react';
import moment from 'moment';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// Components
// CSS
import styles from './footer.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	footerContainer: {
		backgroundColor: '#171717',
		position: 'relative',
		bottom: 0,
		// minHeight: '100vh',
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.root}>
			<Grid container className={classes.footerContainer}>
				<Container maxWidth='lg'>
					<Grid item xs>
						<Box style={{ padding: '80px 0' }}>
							<Box style={{ paddingBottom: '20px' }}>
								<a href='/faq' className={styles.footerLink}>
									FAQ
								</a>
								<a
									href='mailto:abcwildrift@gmail.com'
									className={styles.footerLink}
								>
									Feedback
								</a>
								<a href='/' className={styles.footerLink}>
									Report a Bug
								</a>
							</Box>
							<Box>
								<p className={styles.footerDescription}>
									© {moment().year()} Rift Builds. Rift Builds isn’t endorsed by
									Riot Games and doesn’t reflect the views or opinions of Riot
									Games or anyone officially involved in producing or managing
									League of Legends. League of Legends and Riot Games are
									trademarks or registered trademarks of Riot Games, Inc. League
									of Legends © Riot Games, Inc.
								</p>
							</Box>
						</Box>
					</Grid>
				</Container>
			</Grid>
		</footer>
	);
};

export default Footer;
