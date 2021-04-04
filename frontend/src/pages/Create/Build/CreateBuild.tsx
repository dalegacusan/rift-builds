import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

import { URL } from '../../../shared/constants/constants';
import { Message } from '../../../shared/constants/validationMessages';
import { Validate, ValidateHelper } from '../../../shared/utils/validations';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../store/actions';

// MaterialUI
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
	ValidationResult,
} from '../../../shared/interfaces/interfaces';

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
			const HAS_BUILD_TITLE = Validate.HAS_BUILD_TITLE(completeBuild);
			const IS_VALID_BUILD_TITLE = Validate.IS_VALID_BUILD_TITLE(completeBuild);
			const IS_VALID_ROLE = Validate.IS_VALID_ROLE(completeBuild, roles);
			const IS_VALID_GAME_MODE = Validate.IS_VALID_GAME_MODE(completeBuild);
			const IS_VALID_BUILD_DESCRIPTION = Validate.IS_VALID_BUILD_DESCRIPTION(
				completeBuild
			);

			validationsCollection = [
				HAS_BUILD_TITLE,
				IS_VALID_BUILD_TITLE,
				IS_VALID_ROLE,
				IS_VALID_GAME_MODE,
				IS_VALID_BUILD_DESCRIPTION,
			];

			allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
				validationsCollection
			);
		} else if (activeStep === 1) {
			const IS_VALID_CHAMPION = Validate.IS_VALID_CHAMPION(
				completeBuild,
				champions
			);
			const HAS_ITEMS_SELECTED = Validate.HAS_ITEMS_SELECTED(completeBuild);
			const HAS_THREE_TO_SIX_PRIMARY_ITEMS = Validate.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
				completeBuild
			);
			const IS_VALID_ITEMS_SELECTED = Validate.IS_VALID_ITEMS_SELECTED(
				completeBuild,
				items
			);
			const IS_VALID_NUMBER_OF_ITEMS_SELECTED = Validate.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
				completeBuild
			);
			const IS_VALID_RUNES = Validate.IS_VALID_RUNES(completeBuild, runes);
			const IS_VALID_SPELLS = Validate.IS_VALID_SPELLS(completeBuild, spells);

			validationsCollection = [
				IS_VALID_CHAMPION,
				HAS_ITEMS_SELECTED,
				HAS_THREE_TO_SIX_PRIMARY_ITEMS,
				IS_VALID_ITEMS_SELECTED,
				IS_VALID_NUMBER_OF_ITEMS_SELECTED,
				IS_VALID_RUNES,
				IS_VALID_SPELLS,
			];

			allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
				validationsCollection
			);
		}

		if (allValidationsAreValid) {
			return true;
		}

		// Find all validations that returned false
		// Return first validation that failed, hence [0]
		const invalidValidation = ValidateHelper.findValidationErrorAndReturn(
			validationsCollection
		);

		setSnackbarControls({
			snackbarControls: {
				message: invalidValidation.message,
				shouldOpen: true,
				snackbarType: 'error',
			},
		});

		return false;
	};

	const validateBuild = () => {
		const HAS_BUILD_TITLE = Validate.HAS_BUILD_TITLE(completeBuild);
		const IS_VALID_BUILD_TITLE = Validate.IS_VALID_BUILD_TITLE(completeBuild);
		const HAS_ITEMS_SELECTED = Validate.HAS_ITEMS_SELECTED(completeBuild);
		const HAS_THREE_TO_SIX_PRIMARY_ITEMS = Validate.HAS_THREE_TO_SIX_PRIMARY_ITEMS(
			completeBuild
		);
		const HAS_USERNAME = Validate.HAS_USERNAME(completeBuild);
		const IS_VALID_USERNAME = Validate.IS_VALID_USERNAME(completeBuild);
		const IS_VALID_ROLE = Validate.IS_VALID_ROLE(completeBuild, roles);
		const IS_VALID_GAME_MODE = Validate.IS_VALID_GAME_MODE(completeBuild);
		const IS_VALID_BUILD_DESCRIPTION = Validate.IS_VALID_BUILD_DESCRIPTION(
			completeBuild
		);
		const IS_VALID_CHAMPION = Validate.IS_VALID_CHAMPION(
			completeBuild,
			champions
		);
		const IS_VALID_ITEMS_SELECTED = Validate.IS_VALID_ITEMS_SELECTED(
			completeBuild,
			items
		);
		const IS_VALID_RUNES = Validate.IS_VALID_RUNES(completeBuild, runes);
		const IS_VALID_SPELLS = Validate.IS_VALID_SPELLS(completeBuild, spells);
		const IS_VALID_RANK = Validate.IS_VALID_RANK(completeBuild, ranks);
		const IS_VALID_NUMBER_OF_ITEMS_SELECTED = Validate.IS_VALID_NUMBER_OF_ITEMS_SELECTED(
			completeBuild
		);
		const IS_VALID_REGION = Validate.IS_VALID_REGION(completeBuild);

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

		const allValidationsAreValid = ValidateHelper.checkAllValidationsAreValid(
			validationsCollection
		);

		if (allValidationsAreValid) {
			return {
				message: null,
				result: true,
			};
		}

		return ValidateHelper.findValidationErrorAndReturn(validationsCollection);
	};

	const submitBuild = async () => {
		// Validations
		const isValidBuild = validateBuild();

		if (isValidBuild.result) {
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
						setOpenBackdrop(false);

						setSnackbarControls({
							snackbarControls: {
								message: Message.ERROR.BUILD_NOT_SAVED,
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
						message: Message.ERROR.BUILD_NOT_SAVED,
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
