import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import ReCaptcha from '../ReCaptcha/ReCaptcha';
import StepperButtons from './components/StepperButtons';
// Types
type StepperProps = {
	activeStep: number;
	componentToDisplay: React.ReactNode;
	openRecaptcha: boolean;
	resetCaptcha: () => void;
	setActiveStep: (step: any) => void;
	submitBuild: () => void;
};
// CSS
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
	})
);

function getSteps() {
	return ['Build Information', 'Create Build', 'Player Information'];
}

const HorizontalLabelPositionBelowStepper = (props: StepperProps) => {
	const { activeStep, componentToDisplay, setActiveStep, submitBuild } = props;
	const { openRecaptcha, resetCaptcha } = props;
	const classes = useStyles();

	// ===== Stepper ===== //
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
	};

	return (
		<div className={classes.root}>
			{/* Build Components */}
			<Box style={{ padding: '10px 0' }}>{componentToDisplay}</Box>

			{/* ReCAPTCHA */}
			<Box display='flex' flexDirection='row-reverse'>
				{openRecaptcha && activeStep === steps.length - 1 ? (
					<ReCaptcha resetCaptcha={resetCaptcha} />
				) : null}
			</Box>

			{/* Buttons */}
			<Box display='flex' flexDirection='row-reverse'>
				<StepperButtons
					activeStep={activeStep}
					submitBuild={submitBuild}
					handleNext={handleNext}
					handleBack={handleBack}
					steps={steps}
				/>
			</Box>
		</div>
	);
};

export default HorizontalLabelPositionBelowStepper;
