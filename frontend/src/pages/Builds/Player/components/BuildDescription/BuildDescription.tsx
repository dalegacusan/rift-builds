import React from 'react';

// MaterialUI
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// CSS
import styles from './builddescription.module.css';
// Types
type BuildDescriptionProps = {
	description: string;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
	})
);

const BuildDescription = (props: BuildDescriptionProps) => {
	const { description } = props;
	const classes = useStyles();

	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (
		event: React.ChangeEvent<{}>,
		isExpanded: boolean
	) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Accordion
			expanded={expanded === 'panel1'}
			onChange={handleChange('panel1')}
			className={styles.accordionContainer}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
				aria-controls='panel1bh-content'
				id='panel1bh-header'
				className={styles.accordionQuestionContainer}
			>
				<Typography className={classes.heading}>Build Description</Typography>
			</AccordionSummary>
			<AccordionDetails className={styles.accordionAnswerContainer}>
				<p>{description.toString()}</p>
			</AccordionDetails>
		</Accordion>
	);
};

export default BuildDescription;
