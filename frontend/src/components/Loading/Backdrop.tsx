import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const LoadingBackdrop = (props: { openBackdrop: boolean }) => {
	const classes = useStyles();
	const { openBackdrop } = props;

	return (
		<Backdrop className={classes.backdrop} open={openBackdrop}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};

export default LoadingBackdrop;
