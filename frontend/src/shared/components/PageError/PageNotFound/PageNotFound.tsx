import React from 'react';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

import PageNotFoundMascot from './assets/page_not_found_mascot.png';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// CSS
import globalstyles from '../error.module.css';
import styles from './pagenotfound.module.css';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	})
);

const PageNotFound = () => {
	const classes = useStyles();

	return (
		<>
			<Helmet>
				<title>Page not found - Rift Builds</title>
			</Helmet>
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Box display='flex' justifyContent='center'>
							<Box className={globalstyles.errorContainer}>
								<p className={styles.errorNumber}>404</p>
								<p className={styles.errorTitle}>Page not found</p>
								<p className={styles.errorDescription}>
									The page you were looking for could not be found.
								</p>
								<a href='/' style={{ textDecoration: 'none' }}>
									<Button
										variant='contained'
										color='primary'
										className={styles.errorButton}
									>
										Back to home
									</Button>
								</a>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box
							className={globalstyles.errorContainer}
							display='flex'
							justifyContent='center'
						>
							<img
								src={PageNotFoundMascot}
								alt='Page Not Found Mascot'
								className={styles.errorImage}
							/>
						</Box>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default PageNotFound;
