import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../shared/store/actions';

// Shared
import {
	getItemFromSession,
	removeItemFromSession,
} from '../../../shared/utils/sessionStorage';
import { saveBuild } from '../../../shared/services/buildsRequests';
import { Message } from '../../../shared/constants/validationMessages';
import { BuildValidationHelper } from '../../../shared/utils/buildValidationHelpers';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components
import BackdropLoading from '../../../shared/components/Loading/Backdrop';
import BuildInformation from './BuildInformation';
import CreateBuildHeader from './Header';
import GeneralInformation from './GeneralInformation';
import PlayerInformation from './PlayerInformation';
import Stepper from './Stepper';
import Snackbars from '../../../shared/components/AlertPopup/AlertPopup';

// CSS

// Types
import {
	snackbarControlsInterface,
	ValidationResult,
} from '../../../shared/interfaces/interfaces';
import { ChampionInterface } from '../../../shared/interfaces/GameData';
import { RootState } from '../../../shared/interfaces/GlobalStore';

const CreateBuild = (props: CreateBuildProps) => {
	// Game Data PROPS
	const { gameData } = props;
	const { roles, champions, items, runes, spells, ranks } = gameData;
	// Build PROPS
	const { completeBuild, resetBuild, setChampionSelected } = props;
	// ReCaptcha PROPS
	const { recaptcha } = props;
	const { recaptchaRef, recaptchaToken } = recaptcha;
	const { resetRecaptchToken } = props;
	// Snackbar Controls PROPS
	const { setSnackbarControls } = props;

	// Stores build data from database after successful creation
	const [savedBuild, setSavedBuild] = useState({
		// has "id" property for page redirection ( if(hasSubmittedBuild) )
		// else gives an error that savedBuild.id isn't defined
		id: '',
	});
	const [activeStep, setActiveStep] = useState(0);
	const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
	const [hasSubmittedBuild, setHasSubmittedBuild] = useState(false);

	const [openRecaptcha, setOpenRecaptcha] = useState(false);

	const resetCaptcha = () => {
		// recaptchaRef.current is possibly null so it needs to be validated before reset
		if (recaptchaRef.current) {
			recaptchaRef.current.reset();
			resetRecaptchToken('');
		}
	};

	let componentToDisplay;
	if (activeStep === 0) {
		componentToDisplay = <GeneralInformation />;
	} else if (activeStep === 1) {
		componentToDisplay = <BuildInformation />;
	} else if (activeStep === 2) {
		componentToDisplay = <PlayerInformation />;
	}

	const validateStep = () => {
		// Validations for EACH step
		// isValidStep returns ValidationResult Interface
		const isValidStep: ValidationResult = BuildValidationHelper.validateStep(
			activeStep,
			completeBuild,
			champions,
			items,
			runes,
			spells,
			roles
		);

		// Check if step is not valid
		// If not valid, return false - show error snackbar
		// If valid, return true
		if (!isValidStep.result) {
			setSnackbarControls({
				snackbarControls: {
					message: isValidStep.message,
					shouldOpen: true,
					snackbarType: 'error',
				},
			});

			return false;
		}

		return true;
	};

	const submitBuild = async () => {
		// Validations for WHOLE build
		// isValidBuild returns ValidationResult Interface
		const isValidBuild: ValidationResult = BuildValidationHelper.validateBuild(
			completeBuild,
			champions,
			items,
			runes,
			spells,
			ranks,
			roles
		);

		if (isValidBuild.result) {
			setOpenRecaptcha(true);

			if (!recaptchaToken) {
				return;
			}

			setOpenBackdrop(true);

			const saveToDatabase = await saveBuild(completeBuild, recaptchaToken)
				.then((res) => {
					setSavedBuild(res.data);
					setHasSubmittedBuild(true);
					resetBuild();
				})
				.catch((err) => {
					setOpenBackdrop(false);

					// Check what's the error
					// If error is from rate limiter, return creating too many builds message,
					// else, return generic error message
					if (
						err.response.status === 429 &&
						// Check if error message is the same as ERROR.CREATING_TOO_MANY_BUILDS
						err.response.data === Message.ERROR.CREATING_TOO_MANY_BUILDS
					) {
						setSnackbarControls({
							snackbarControls: {
								message: Message.ERROR.CREATING_TOO_MANY_BUILDS,
								shouldOpen: true,
								snackbarType: 'error',
							},
						});
					} else {
						setSnackbarControls({
							snackbarControls: {
								message: Message.ERROR.FAILED_TO_SAVE_BUILD,
								shouldOpen: true,
								snackbarType: 'error',
							},
						});
					}
				});
		} else {
			// Check if there's a value for message property,
			// else, use a generic error message
			if (isValidBuild.message) {
				setSnackbarControls({
					snackbarControls: {
						message: isValidBuild.message,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			} else {
				setSnackbarControls({
					snackbarControls: {
						message: Message.ERROR.FAILED_TO_SAVE_BUILD,
						shouldOpen: true,
						snackbarType: 'error',
					},
				});
			}

			resetCaptcha();

			return;
		}
	};

	useEffect(() => {
		// Retrieve session data for the champion a user will create a build for
		// This session item is set in NoBuilds.tsx
		// This one is used if there are no builds for a champion and a user wants to create a build for that champion
		const championToCreateFirstBuild:
			| string
			| null
			| undefined = getItemFromSession('championToCreateFirstBuild');

		if (championToCreateFirstBuild) {
			setChampionSelected(JSON.parse(championToCreateFirstBuild));
		}

		return removeItemFromSession('championToCreateFirstBuild');
	}, []);

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
					validateStep={validateStep}
				/>
			</Box>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		gameData: state.gameData,
		completeBuild: state.build,
		recaptcha: state.recaptcha,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		resetBuild: () => dispatch({ type: actionTypes.BUILD_RESET }),
		resetRecaptchToken: (token: string) =>
			dispatch({ type: actionTypes.RECAPTCHA_SET_TOKEN, data: token }),
		setSnackbarControls: (newControls: snackbarControlsInterface) =>
			dispatch({
				type: actionTypes.SNACKBAR_SET_CONTROLS,
				data: newControls.snackbarControls,
			}),
		setChampionSelected: (newChampionSelected: ChampionInterface) =>
			dispatch({
				type: actionTypes.BUILD_SET_CHAMPIONSELECTED,
				data: newChampionSelected,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CreateBuildProps = PropsFromRedux;

export default connector(CreateBuild);
