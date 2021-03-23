import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReCaptcha } from '../../../../../shared/constants/constants';
import ReCAPTCHA from 'react-google-recaptcha';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import StepperButtons from './components/StepperButtons';
// Types
type StepperProps = {
	activeStep: number;
	componentToDisplay: React.ReactNode;
	openRecaptcha: boolean;
	recaptchaRef: any;
	setActiveStep: (step: any) => void;
	setOpenRecaptcha: (shouldOpen: boolean) => void;
	setRecaptchaToken: (token: string | null) => void;
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
	const {
		activeStep,
		componentToDisplay,
		openRecaptcha,
		setActiveStep,
		setOpenRecaptcha,
		setRecaptchaToken,
		submitBuild,
	} = props;
	let { recaptchaRef } = props;
	const classes = useStyles();

	// ===== ReCaptcha ===== //
	const recaptchaHandleChange = (value: string | null) => {
		setRecaptchaToken(value);
	};
	const resetCaptcha = () => {
		// if (recaptchaRef.current) {
		// 	recaptchaRef.current.reset();

		// 	console.log(recaptchaRef);
		// 	console.log('Resetting');
		// }
		console.log(recaptchaRef);
	};

	// ===== Stepper ===== //
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
	};

	useEffect(() => {
		if (activeStep !== steps.length - 1) {
			setOpenRecaptcha(false);
			resetCaptcha();
		}
	}, [activeStep]);

	return (
		<div className={classes.root}>
			{/* Build Components */}
			<Box style={{ padding: '10px 0' }}>{componentToDisplay}</Box>

			{/* ReCAPTCHA */}
			<Box display='flex' flexDirection='row-reverse'>
				{openRecaptcha && activeStep === steps.length - 1 ? (
					<ReCAPTCHA
						ref={(el) => {
							recaptchaRef = el;
						}}
						sitekey={ReCaptcha.PUBLIC_KEY!} // Always has a value hence !
						onChange={recaptchaHandleChange}
						onExpired={() => resetCaptcha()}
					/>
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
