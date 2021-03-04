import React from 'react';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// CSS
import styles from './buildlearnmorebutton.module.css';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		learnMoreButton: {
			color: '#CFCFCF',
			backgroundColor: theme.palette.primary.dark,
		},
	})
);
// Types
type BuildLearnMoreButtonProps = {
	buildId: string | undefined;
};

const BuildLearnMoreButton = (props: BuildLearnMoreButtonProps) => {
	const { buildId } = props;
	const classes = useStyles();

	return (
		<a href={`/build/${buildId}`} style={{ textDecoration: 'none' }}>
			<Button variant='contained' className={classes.learnMoreButton}>
				Learn more
			</Button>
		</a>
	);
};

export default BuildLearnMoreButton;
