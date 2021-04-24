import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../store/actions';

// MaterialUI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
// Types
import { snackbarControlsInterface } from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/GlobalStore';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const AlertPopup = (props: AlertPopupProps) => {
	const classes = useStyles();
	const { snackbarControls, setSnackbarControls } = props;
	const { message, shouldOpen, snackbarType } = snackbarControls;

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarControls({
			snackbarControls: {
				message: '',
				shouldOpen: false,
				snackbarType: '',
			},
		});
	};

	return (
		<>
			{shouldOpen ? (
				<div className={classes.root}>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						open={shouldOpen}
						autoHideDuration={4000}
						onClose={handleClose}
					>
						<Alert
							onClose={handleClose}
							severity={snackbarType === 'success' ? 'success' : 'error'}
						>
							{message}
						</Alert>
					</Snackbar>
				</div>
			) : null}
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		snackbarControls: state.snackbarControls,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setSnackbarControls: (newControls: snackbarControlsInterface) =>
			dispatch({
				type: actionTypes.SNACKBAR_SET_CONTROLS,
				data: newControls.snackbarControls,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AlertPopupProps = PropsFromRedux;

export default connector(AlertPopup);
