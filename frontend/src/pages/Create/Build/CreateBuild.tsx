import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

import { URL } from '../../../shared/constants/constants';
import { Error, Success } from '../../../shared/utils/messages';
import { VALIDATE } from '../../../shared/utils/validations';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../store/actions';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import Stepper from './components/Stepper/Stepper';
import Snackbars from '../../../components/Snackbars/Snackbars';
import BackdropLoading from '../../../components/Loading/Backdrop';
import BuildInformation from './components/BuildInformation/BuildInformation';
import BuildSelection from './components/BuildSelection/BuildSelection';
import CreateBuildHeader from './components/CreateBuildHeader/CreateBuildHeader';
import PlayerInformation from './components/PlayerInformation/PlayerInformation';
// CSS
import styles from './createbuild.module.css';
// Types
import {
	RootState,
	snackbarControlsInterface,
	ItemInterface,
} from '../../../shared/constants/interfaces';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const CreateBuild = (props: CreateBuildProps) => {
	const classes = useStyles();
	// Build PROPS
	const { completeBuild, refreshState } = props;
	// ReCaptcha PROPS
	const { recaptcha } = props;
	const { recaptchaRef, recaptchaToken } = recaptcha;
	const { resetRecaptchToken } = props;
	// Snackbar Controls Props
	const { setSnackbarControls } = props;

	// Stores build data from database after successful creation
	const [savedBuild, setSavedBuild] = useState({
		id: '',
	});
	const [activeStep, setActiveStep] = useState(0);
	const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
	const [hasSubmittedBuild, setHasSubmittedBuild] = useState(false);

	const [openRecaptcha, setOpenRecaptcha] = useState(false);

	const resetCaptcha = () => {
		// Object is possibly null so it needs to be validated
		if (recaptchaRef.current) {
			recaptchaRef.current.reset();
			resetRecaptchToken('');
		}
	};

	let componentToDisplay;
	if (activeStep === 0) {
		componentToDisplay = <BuildInformation />;
	} else if (activeStep === 1) {
		componentToDisplay = <BuildSelection formControl={classes.formControl} />;
	} else if (activeStep === 2) {
		componentToDisplay = (
			<PlayerInformation formControl={classes.formControl} />
		);
	}

	const submitBuild = async () => {
		// Validations
		const HAS_ITEMS_SELECTED = VALIDATE.HAS_ITEMS_SELECTED(completeBuild);
		const HAS_SIX_PRIMARY_ITEMS = VALIDATE.HAS_SIX_PRIMARY_ITEMS(completeBuild);
		const HAS_USERNAME = VALIDATE.HAS_USERNAME(completeBuild);
		const HAS_BUILD_TITLE = VALIDATE.HAS_BUILD_TITLE(completeBuild);

		if (
			HAS_BUILD_TITLE &&
			HAS_ITEMS_SELECTED &&
			HAS_SIX_PRIMARY_ITEMS &&
			HAS_USERNAME
		) {
			setOpenRecaptcha(true);

			if (!recaptchaToken) {
				return;
			}

			setOpenBackdrop(true);
			const saveToDatabase = await axios
				.post(`${URL.SERVER}/api/build/save`, {
					build: {
						...completeBuild,
						dateSubmitted: new Date(),
					},
					recaptchaToken,
				})
				.then((res) => {
					setSavedBuild(res.data);
					setHasSubmittedBuild(true);
					refreshState();
				})
				.catch((err) => {
					if (
						err.response.status === 429 &&
						err.response.data ===
							"You're creating too many builds. Please try again after 30 minutes."
					) {
						setSnackbarControls({
							snackbarControls: {
								message: err.response.data,
								shouldOpen: true,
								snackbarType: 'error',
							},
						});
					} else {
						setOpenBackdrop(false);

						setSnackbarControls({
							snackbarControls: {
								message: Error.BUILD_NOT_SAVED,
								shouldOpen: true,
								snackbarType: 'error',
							},
						});
					}
				});
		} else {
			if (!HAS_BUILD_TITLE) {
				setSnackbarControls({
					snackbarControls: {
						message: Error.NO_BUILD_TITLE,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			} else if (!HAS_ITEMS_SELECTED) {
				setSnackbarControls({
					snackbarControls: {
						message: Error.NO_ITEMS_SELECTED,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			} else if (!HAS_SIX_PRIMARY_ITEMS) {
				setSnackbarControls({
					snackbarControls: {
						message: Error.DOES_NOT_HAVE_SIX_PRIMARY_ITEMS,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			} else if (!HAS_USERNAME) {
				setSnackbarControls({
					snackbarControls: {
						message: Error.NO_USERNAME,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			}

			resetCaptcha();

			return;
		}
	};

	if (hasSubmittedBuild) {
		return <Redirect to={`/build/${savedBuild.id}`} />;
	}

	return (
		<>
			<Helmet>
				<title>Create a build - Rift Builds</title>
			</Helmet>
			<Box>
				<BackdropLoading openBackdrop={openBackdrop} />
				<Snackbars />
				<CreateBuildHeader />

				<Stepper
					activeStep={activeStep}
					componentToDisplay={componentToDisplay}
					openRecaptcha={openRecaptcha}
					resetCaptcha={resetCaptcha}
					setActiveStep={setActiveStep}
					submitBuild={submitBuild}
				/>
			</Box>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		completeBuild: state.build,
		recaptcha: state.recaptcha,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		refreshState: () => dispatch({ type: actionTypes.BUILD_REFRESH }),
		resetRecaptchToken: (token: string) =>
			dispatch({ type: actionTypes.RECAPTCHA_SET_TOKEN, data: token }),
		setSnackbarControls: (newControls: snackbarControlsInterface) =>
			dispatch({
				type: actionTypes.SNACKBAR_SET_CONTROLS,
				data: newControls.snackbarControls,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CreateBuildProps = PropsFromRedux;

export default connector(CreateBuild);
