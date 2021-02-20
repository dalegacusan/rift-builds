import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from '../../../utils/interfaces';
type CreateBuildProps = {
	champions: Array<ChampionInterface>;
	items: Array<ItemInterface>;
	runes: Array<RuneInterface>;
	spells: Array<SpellInterface>;
	ranks: Array<RankInterface>;
};

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const CreateBuild = (props: CreateBuildProps) => {
	const classes = useStyles();
	const { champions, items, runes, spells, ranks } = props;
	const [activeStep, setActiveStep] = useState(0);
	const [build, setBuild] = useState<any>({
		buildTitle: '',
		buildRole: '',
		champion: {},
		dateSubmitted: '',
		items: [],
		rank: {},
		runes: {},
		spells: [],
		username: '',
	});
	const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
	const [hasSubmittedBuild, setHasSubmittedBuild] = useState(false);

	console.log(build);

	let componentToDisplay;
	if (activeStep === 0) {
		componentToDisplay = (
			<BuildInformation
				formControl={classes.formControl}
				setBuild={(newBuild: any) => {
					setBuild(newBuild);
				}}
			/>
		);
	} else if (activeStep === 1) {
		componentToDisplay = (
			<BuildSelection
				formControl={classes.formControl}
				champions={champions}
				items={items}
				runes={runes}
				spells={spells}
				setBuild={(newBuild: object) => {
					setBuild(newBuild);
				}}
			/>
		);
	} else if (activeStep === 2) {
		componentToDisplay = (
			<PlayerInformation
				formControl={classes.formControl}
				ranks={ranks}
				setBuild={(newBuild: any) => {
					setBuild(newBuild);
				}}
			/>
		);
	}

	const submitBuild = async () => {
		if (build.items.length !== 0 && build.username) {
			// setOpenBackdrop(!openBackdrop);
			const saveToDatabase = await axios
				.post(
					// 'https://wildriftbuilds.herokuapp.com/api/build/save',
					'/api/build/save',
					build
				)
				.then((res) => {
					// successBuildSaved();
					setBuild(res.data);
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
			if (build.items.length === 0) {
				// errorNoItemSelected();
				console.log('No items selected');
			} else if (!build.username) {
				// errorNoUsername();
				console.log('No username');
			}
			return;
		}
	};

	if (activeStep === 3) {
		submitBuild();
	}

	if (hasSubmittedBuild) {
		return <Redirect to={`/build/${build.id}`} />;
	}

	return (
		<Box>
			<BackdropLoading openBackdrop={openBackdrop} />
			<CreateBuildHeader />

			<Stepper
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				componentToDisplay={componentToDisplay}
				setOpenBackdrop={setOpenBackdrop}
			/>
		</Box>
	);
};

export default CreateBuild;
