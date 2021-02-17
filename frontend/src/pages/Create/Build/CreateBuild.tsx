import React, { useState } from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import Stepper from './components/Stepper/Stepper';
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
	const [build, setBuild] = useState({});

	console.log(build);

	let componentToDisplay;
	if (activeStep === 0) {
		componentToDisplay = (
			<BuildInformation
				formControl={classes.formControl}
				setBuild={(newBuild: object) => {
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
				setBuild={(newBuild: object) => {
					setBuild(newBuild);
				}}
			/>
		);
	}

	return (
		<Box>
			<CreateBuildHeader />

			<Stepper
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				componentToDisplay={componentToDisplay}
			/>
		</Box>
	);
};

export default CreateBuild;
