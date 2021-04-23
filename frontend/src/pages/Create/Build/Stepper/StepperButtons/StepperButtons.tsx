import React from 'react';

// MaterialUI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
// CSS
import styles from './stepperbuttons.module.css';
// Types
type StepperButtonsProps = {
	activeStep: number;
	handleNext: () => void;
	handleBack: () => void;
	submitBuild: () => void;
	steps: Array<string>;
};

const StepperButtons = (props: StepperButtonsProps) => {
	const { activeStep, handleNext, handleBack, submitBuild, steps } = props;

	return (
		<>
			{/* Check if current step is last step */}
			{activeStep === steps.length - 1 ? (
				<Button
					variant='contained'
					color='primary'
					onClick={submitBuild}
					className={styles.stepperButton}
				>
					Create Build
				</Button>
			) : (
				<Button
					variant='contained'
					color='primary'
					onClick={handleNext}
					className={styles.stepperButton}
				>
					Next
				</Button>
			)}

			{/* Don't show back button ONLY when active step is 0 (start of stepper) */}
			{activeStep !== 0 ? (
				<Button
					onClick={handleBack}
					className={`${styles.backButton} ${styles.stepperButton}`}
				>
					<ArrowBackIcon className={styles.backArrowIcon} /> Back
				</Button>
			) : null}
		</>
	);
};

export default StepperButtons;
