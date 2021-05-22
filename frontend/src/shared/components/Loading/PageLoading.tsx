import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',

			justifyContent: 'center',
			alignItems: 'center',

			width: '100%',
			height: '80vh',
		},
	})
);

const LoadingCircle = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default LoadingCircle;
