import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Types
type StepperProps = {
	activeStep: number;
	setActiveStep(step: any): void;
	componentToDisplay: React.ReactNode;
};
// CSS
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		backButton: {
			marginRight: theme.spacing(1),
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
	const { activeStep, setActiveStep, componentToDisplay } = props;

	const classes = useStyles();
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed
						</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<Box style={{ padding: '10px 0' }}>{componentToDisplay}</Box>
						<Box display='flex' flexDirection='row-reverse'>
							<Button variant='contained' color='primary' onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Create Build' : 'Next'}
							</Button>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
							>
								Back
							</Button>
						</Box>
					</div>
				)}
			</div>
		</div>
	);
};

export default HorizontalLabelPositionBelowStepper;
