import React from 'react';
import {
	patchVersion,
	tierListCreatorName,
	tierListCreatorURL,
	tierListURL,
	contactEmailAddress,
} from '../../../utils/globalvars';

// MaterialUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
// CSS
import styles from './accordionfaq.module.css';
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

export default function ControlledAccordions() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (
		event: React.ChangeEvent<{}>,
		isExpanded: boolean
	) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			{/* 
				Panel 1 
				Can I edit/delete a build I created?
			*/}
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
					<Typography className={classes.heading}>
						Can I edit/delete a build I created?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>
						No. We don't support editing and deleting builds as of the moment.
					</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 2 
				How many builds can I create?
			*/}
			<Accordion
				expanded={expanded === 'panel2'}
				onChange={handleChange('panel2')}
				className={styles.accordionContainer}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
					aria-controls='panel2bh-content'
					id='panel2bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						How many builds can I create?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>You can create up to X builds per Y</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 3
				How can I share a build I created?
			*/}
			<Accordion
				expanded={expanded === 'panel3'}
				onChange={handleChange('panel3')}
				className={styles.accordionContainer}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
					aria-controls='panel3bh-content'
					id='panel3bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						How can I share a build I created?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>You can share your build by</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 4
				How can I report an inappropriate/troll build?
			*/}
			<Accordion
				expanded={expanded === 'panel4'}
				onChange={handleChange('panel4')}
				className={styles.accordionContainer}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
					aria-controls='panel4bh-content'
					id='panel4bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						How can I report an inappropriate/troll build?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>
						Click&nbsp;
						<span className={styles.reportBuildText}>Report this build</span>
					</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 5
				Where do you get your tier list data from?
			*/}
			<Accordion
				expanded={expanded === 'panel5'}
				onChange={handleChange('panel5')}
				className={styles.accordionContainer}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
					aria-controls='panel5bh-content'
					id='panel5bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						Where do you get your tier list data from?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p className={styles.tierListReference}>
						Our tier list is referenced from&nbsp;
						<a href={tierListCreatorURL}>{tierListCreatorName}</a>
						's Patch {patchVersion}&nbsp;
						<a href={tierListURL}>Tier List</a>
					</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 6
				I want to recommend a feature
			*/}
			<Accordion
				expanded={expanded === 'panel6'}
				onChange={handleChange('panel6')}
				className={styles.accordionContainer}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
					aria-controls='panel6bh-content'
					id='panel6bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						I want to recommend a feature
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>
						We would love to hear from you! Send us an email at&nbsp;
						<span className={styles.contactEmailAddress}>
							{contactEmailAddress}
						</span>
					</p>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
