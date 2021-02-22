import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
import { RootState } from '../../../utils/interfaces';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const CreateBuild = (props: CreateBuildProps) => {
	const classes = useStyles();
	// Build PROPS
	const { completeBuild } = props;

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

	const submitBuild = async () => {
		if (completeBuild.itemsConfirmed.length !== 0 && completeBuild.username) {
			setOpenBackdrop(true);
			const saveToDatabase = await axios
				.post(
					// 'https://wildriftbuilds.herokuapp.com/api/build/save',
					'/api/build/save',
					{
						...completeBuild,
						dateSubmitted: new Date(),
					}
				)
				.then((res) => {
					// successBuildSaved();
					setSavedBuild(res.data);
					setHasSubmittedBuild(true);
					console.log('Successfully saved build');
				})
				.catch((err) => {
					if (
						err.response.status === 429 &&
						err.response.data ===
							"You're creating too many builds. Please try again after 30 minutes."
					) {
						// errorBuildSaved(err.response.data);
						console.log("You're creating too many builds");
					} else {
						// errorBuildSaved('Something went wrong. Failed to save build.');
						console.log('Something went wrong. Failed to save build.');
					}
				});
		} else {
			if (completeBuild.itemsConfirmed.length === 0) {
				// errorNoItemSelected();
				console.log('No items selected');
			} else if (!completeBuild.username) {
				// errorNoUsername();
				console.log('No username');
			}
			return;
		}
	};

	if (hasSubmittedBuild) {
		console.log(savedBuild);
		return <Redirect to={`/build/${savedBuild.id}`} />;
	}

	return (
		<Box>
			<BackdropLoading openBackdrop={openBackdrop} />
			<CreateBuildHeader />

			<Stepper
				activeStep={activeStep}
				componentToDisplay={componentToDisplay}
				setActiveStep={setActiveStep}
				submitBuild={submitBuild}
			/>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		completeBuild: state.build,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CreateBuildProps = PropsFromRedux;

export default connector(CreateBuild);
