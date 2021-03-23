import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { Error, Success } from '../../../shared/utils/messagepopups';
import { URL } from '../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../store/actions';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import Stepper from './components/Stepper/Stepper';
import BackdropLoading from '../../../components/Loading/Backdrop';
import BuildInformation from './components/BuildInformation/BuildInformation';
import BuildSelection from './components/BuildSelection/BuildSelection';
import CreateBuildHeader from './components/CreateBuildHeader/CreateBuildHeader';
import PlayerInformation from './components/PlayerInformation/PlayerInformation';
// CSS
import styles from './createbuild.module.css';
// Types
import { RootState, ItemInterface } from '../../../shared/constants/interfaces';

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

	// Stores build data from database after successful creation
	const [savedBuild, setSavedBuild] = useState({
		id: '',
	});
	const [activeStep, setActiveStep] = useState(0);
	const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
	const [hasSubmittedBuild, setHasSubmittedBuild] = useState(false);

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

	// ReCaptcha Handlers
	let recaptchaRef: any = React.createRef();
	const [recaptchaToken, setRecaptchaToken] = useState<string | null>('');
	const [openRecaptcha, setOpenRecaptcha] = useState(false);

	const submitBuild = async () => {
		const buildItems = completeBuild.itemsConfirmed;

		// Validations
		const isNotEmpty = buildItems.length !== 0;
		const hasSixPrimaryItems =
			buildItems.filter((item: ItemInterface) => item.type === 'primary')
				.length === 6;
		const hasUsername = completeBuild.username;
		const hasBuildTitle = completeBuild.buildTitle;

		// ReCaptcha
		setOpenRecaptcha(true);

		if (recaptchaToken) {
			console.log(recaptchaToken);
		} else if (!recaptchaToken) {
			console.log('Verify yourself.');
		}

		// if (
		// 	completeBuild.itemsConfirmed.length !== 0 &&
		// 	completeBuild.username &&
		// 	completeBuild.buildTitle
		// ) {
		// 	setOpenBackdrop(true);
		// 	const saveToDatabase = await axios
		// 		.post(`${URL.SERVER}/api/build/save`, {
		// 			build: {
		// 				...completeBuild,
		// 				dateSubmitted: new Date(),
		// 			},
		// 			recaptchaToken,
		// 		})
		// 		.then((res) => {
		// 			// successBuildSaved();
		// 			setSavedBuild(res.data);
		// 			setHasSubmittedBuild(true);
		// 			refreshState();
		// 		})
		// 		.catch((err) => {
		// 			if (
		// 				err.response.status === 429 &&
		// 				err.response.data ===
		// 					"You're creating too many builds. Please try again after 30 minutes."
		// 			) {
		// 				Error.BUILD_NOT_SAVED(err.response.data);
		// 			} else {
		// 				setOpenBackdrop(false);
		// 				Error.BUILD_NOT_SAVED(
		// 					'Something went wrong. Failed to save build.'
		// 				);
		// 			}
		// 		});
		// } else {
		// 	if (!completeBuild.buildTitle) {
		// 		Error.NO_BUILD_TITLE();
		// 	} else if (completeBuild.itemsConfirmed.length === 0) {
		// 		Error.NO_ITEMS_SELECTED();
		// 	} else if (!completeBuild.username) {
		// 		Error.NO_USERNAME();
		// 	}
		// 	return;
		// }
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
				<Toaster />
				<CreateBuildHeader />

				<Stepper
					activeStep={activeStep}
					componentToDisplay={componentToDisplay}
					openRecaptcha={openRecaptcha}
					recaptchaRef={recaptchaRef}
					setActiveStep={setActiveStep}
					setOpenRecaptcha={setOpenRecaptcha}
					setRecaptchaToken={setRecaptchaToken}
					submitBuild={submitBuild}
				/>
			</Box>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		completeBuild: state.build,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		refreshState: () => dispatch({ type: actionTypes.BUILD_REFRESH }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CreateBuildProps = PropsFromRedux;

export default connector(CreateBuild);
