import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// MaterialUI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// Types
type StepperProps = {
	activeStep: number;
	componentToDisplay: React.ReactNode;
	setActiveStep: (step: any) => void;
	submitBuild: () => void;
};
// CSS
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		backButton: {
			marginRight: theme.spacing(1),
			color: 'rgb(255,255,255, 60%)',
		},
		backArrowIcon: {
			width: '16px',
			marginRight: '8px',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
	})
);

function getSteps() {
	return ['Build Information', 'Create Build', 'Player Information'];
}

const HorizontalLabelPositionBelowStepper = (props: StepperProps) => {
	const { activeStep, setActiveStep, componentToDisplay, submitBuild } = props;

	const classes = useStyles();
	const steps = getSteps();

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			submitBuild();
		}
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
	};

	return (
		<div className={classes.root}>
			<Box style={{ padding: '10px 0' }}>{componentToDisplay}</Box>
			<Box display='flex' flexDirection='row-reverse'>
				{activeStep === steps.length - 1 ? (
					<Button
						variant='contained'
						color='primary'
						onClick={submitBuild}
						style={{ textTransform: 'none' }}
					>
						Create Build
					</Button>
				) : (
					<Button
						variant='contained'
						color='primary'
						onClick={handleNext}
						style={{ textTransform: 'none' }}
					>
						Next
					</Button>
				)}

				<Button
					disabled={activeStep === 0}
					onClick={handleBack}
					className={classes.backButton}
					style={{ textTransform: 'none' }}
				>
					<ArrowBackIcon className={classes.backArrowIcon} /> Back
				</Button>
			</Box>
		</div>
	);
};

export default HorizontalLabelPositionBelowStepper;
