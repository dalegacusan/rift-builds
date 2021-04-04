import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

import { URL } from '../../../shared/constants/constants';
import { ERROR, SUCCESS } from '../../../shared/utils/messages';
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
} from '../../../shared/constants/interfaces';
type ValidationResult = {
	message: string | null;
	result: boolean;
};

const CreateBuild = (props: CreateBuildProps) => {
	// Game Data PROPS
	const { gameData } = props;
	const { roles, champions, items, runes, spells, ranks } = gameData;
	// Build PROPS
	const { completeBuild, resetState } = props;
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
		componentToDisplay = <BuildInformation />;
	} else if (activeStep === 1) {
		componentToDisplay = <BuildSelection />;
	} else if (activeStep === 2) {
		componentToDisplay = <PlayerInformation />;
	}

	const validateStep = () => {
		let allValidationsAreValid = false;
		let validationsCollection: Array<ValidationResult> = [];

		if (activeStep === 0) {
			const HAS_BUILD_TITLE = VALIDATE.HAS_BUILD_TITLE(completeBuild);
			const IS_VALID_BUILD_TITLE = VALIDATE.IS_VALID_BUILD_TITLE(completeBuild);
			const IS_VALID_ROLE = VALIDATE.IS_VALID_ROLE(completeBuild, roles);
			const IS_VALID_GAME_MODE = VALIDATE.IS_VALID_GAME_MODE(completeBuild);
			const IS_VALID_BUILD_DESCRIPTION = VALIDATE.IS_VALID_BUILD_DESCRIPTION(
				completeBuild
			);

			validationsCollection = [
				HAS_BUILD_TITLE,
				IS_VALID_BUILD_TITLE,
				IS_VALID_ROLE,
				IS_VALID_GAME_MODE,
				IS_VALID_BUILD_DESCRIPTION,
			];

			allValidationsAreValid = checkAllValidationsAreValid(
				validationsCollection
			);
		} else if (activeStep === 1) {
			const IS_VALID_CHAMPION = VALIDATE.IS_VALID_CHAMPION(
				completeBuild,
				champions
			);
			const HAS_ITEMS_SELECTED = VALIDATE.HAS_ITEMS_SELECTED(completeBuild);
			const HAS_THREE_TO_SIX_PRIMARY_ITEMS = VALIDATE.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
				completeBuild
			);
			const IS_VALID_ITEMS_SELECTED = VALIDATE.IS_VALID_ITEMS_SELECTED(
				completeBuild,
				items
			);
			const IS_VALID_NUMBER_OF_ITEMS_SELECTED = VALIDATE.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
				completeBuild
			);
			const IS_VALID_RUNES = VALIDATE.IS_VALID_RUNES(completeBuild, runes);
			const IS_VALID_SPELLS = VALIDATE.IS_VALID_SPELLS(completeBuild, spells);

			validationsCollection = [
				IS_VALID_CHAMPION,
				HAS_ITEMS_SELECTED,
				HAS_THREE_TO_SIX_PRIMARY_ITEMS,
				IS_VALID_ITEMS_SELECTED,
				IS_VALID_NUMBER_OF_ITEMS_SELECTED,
				IS_VALID_RUNES,
				IS_VALID_SPELLS,
			];

			allValidationsAreValid = checkAllValidationsAreValid(
				validationsCollection
			);
		}

		if (allValidationsAreValid) {
			return true;
		}

		// Find all validations that returned false
		// Return first validation that failed, hence [0]
		const error = validationsCollection.filter((validation) => {
			const { result } = validation;

			if (result === false) {
				return validation;
			}
		})[0];

		setSnackbarControls({
			snackbarControls: {
				message: error.message,
				shouldOpen: true,
				snackbarType: 'error',
			},
		});

		return false;
	};

	const checkAllValidationsAreValid = (
		validationsCollection: Array<ValidationResult>
	) => {
		return validationsCollection.every((validation: ValidationResult) => {
			const { result } = validation;

			return result === true;
		});
	};

	const validateBuild = () => {
		const HAS_BUILD_TITLE = VALIDATE.HAS_BUILD_TITLE(completeBuild);
		const IS_VALID_BUILD_TITLE = VALIDATE.IS_VALID_BUILD_TITLE(completeBuild);
		const HAS_ITEMS_SELECTED = VALIDATE.HAS_ITEMS_SELECTED(completeBuild);
		const HAS_THREE_TO_SIX_PRIMARY_ITEMS = VALIDATE.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
			completeBuild
		);
		const HAS_USERNAME = VALIDATE.HAS_USERNAME(completeBuild);
		const IS_VALID_USERNAME = VALIDATE.IS_VALID_USERNAME(completeBuild);
		const IS_VALID_ROLE = VALIDATE.IS_VALID_ROLE(completeBuild, roles);
		const IS_VALID_GAME_MODE = VALIDATE.IS_VALID_GAME_MODE(completeBuild);
		const IS_VALID_BUILD_DESCRIPTION = VALIDATE.IS_VALID_BUILD_DESCRIPTION(
			completeBuild
		);
		const IS_VALID_CHAMPION = VALIDATE.IS_VALID_CHAMPION(
			completeBuild,
			champions
		);
		const IS_VALID_ITEMS_SELECTED = VALIDATE.IS_VALID_ITEMS_SELECTED(
			completeBuild,
			items
		);
		const IS_VALID_RUNES = VALIDATE.IS_VALID_RUNES(completeBuild, runes);
		const IS_VALID_SPELLS = VALIDATE.IS_VALID_SPELLS(completeBuild, spells);
		const IS_VALID_RANK = VALIDATE.IS_VALID_RANK(completeBuild, ranks);
		const IS_VALID_NUMBER_OF_ITEMS_SELECTED = VALIDATE.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
			completeBuild
		);
		const IS_VALID_REGION = VALIDATE.IS_VALID_REGION(completeBuild);

		const validationsCollection = [
			HAS_BUILD_TITLE,
			IS_VALID_BUILD_TITLE,
			HAS_ITEMS_SELECTED,
			HAS_THREE_TO_SIX_PRIMARY_ITEMS,
			HAS_USERNAME,
			IS_VALID_USERNAME,
			IS_VALID_ROLE,
			IS_VALID_GAME_MODE,
			IS_VALID_BUILD_DESCRIPTION,
			IS_VALID_CHAMPION,
			IS_VALID_ITEMS_SELECTED,
			IS_VALID_RUNES,
			IS_VALID_SPELLS,
			IS_VALID_RANK,
			IS_VALID_NUMBER_OF_ITEMS_SELECTED,
			IS_VALID_REGION,
		];

		const allValidationsAreValid = checkAllValidationsAreValid(
			validationsCollection
		);

		if (allValidationsAreValid) {
			return {
				message: null,
				result: true,
			};
		}

		// Find all validations that returned false
		// Return first validation that failed, hence [0]
		return validationsCollection.filter((validation) => {
			const { result } = validation;

			if (result === false) {
				return validation;
			}
		})[0];
	};

	const submitBuild = async () => {
		// Validations
		const isValidBuild = validateBuild();

		if (isValidBuild.result) {
			console.log(completeBuild);
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
					resetState();
				})
				.catch((err) => {
					if (
						err.response.status === 429 &&
						// Check if error message is the same as ERROR.CREATING_TOO_MANY_BUILDS
						err.response.data === ERROR.CREATING_TOO_MANY_BUILDS
					) {
						setSnackbarControls({
							snackbarControls: {
								message: ERROR.CREATING_TOO_MANY_BUILDS,
								shouldOpen: true,
								snackbarType: 'error',
							},
						});
					} else {
						setOpenBackdrop(false);

						setSnackbarControls({
							snackbarControls: {
								message: ERROR.BUILD_NOT_SAVED,
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
						message: ERROR.BUILD_NOT_SAVED,
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
		resetState: () => dispatch({ type: actionTypes.BUILD_RESET }),
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
