import React from 'react';

// Shared
import { Contact, TierList } from '../../../shared/constants/constants';

// Images
import StepOneImage from './assets/step1.png';
import StepTwoImage from './assets/step2.png';

// MaterialUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// CSS
import styles from './Styles.module.css';

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
				className={`${styles.accordionContainer} text-white-secondary`}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className='text-white-secondary' />}
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
				className={`${styles.accordionContainer} text-white-secondary`}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className='text-white-secondary' />}
					aria-controls='panel2bh-content'
					id='panel2bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						How many builds can I create?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>
						You can create up to&nbsp;
						<span className='text-secondary'>6 builds every 30 minutes</span>
					</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 3
				How can I share a build I created?
			*/}
			<Accordion
				expanded={expanded === 'panel3'}
				onChange={handleChange('panel3')}
				className={`${styles.accordionContainer} text-white-secondary`}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className='text-white-secondary' />}
					aria-controls='panel3bh-content'
					id='panel3bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						How can I share a build I created?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<Box>
						<p>
							You can share a build you created by heading over to the&nbsp;
							<span className='text-secondary'>page of your build</span>
						</p>
						<img
							src={StepOneImage}
							style={{ width: '80%' }}
							alt='How to share a build'
						/>
						<p>
							then scroll to the very bottom of the page,&nbsp;
							<span className='text-secondary'>click the copy button</span> and
							it will <i>copy the link to your clipboard</i>.
						</p>
						<img
							src={StepTwoImage}
							style={{ width: '80%' }}
							alt='How to share a build'
						/>
					</Box>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 4
				Where do you get your tier list data from?
			*/}
			<Accordion
				expanded={expanded === 'panel4'}
				onChange={handleChange('panel4')}
				className={`${styles.accordionContainer} text-white-secondary`}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className='text-white-secondary' />}
					aria-controls='panel4bh-content'
					id='panel4bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						Where do you get your tier list data from?
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p className={styles.tierListReference}>
						Our current tier list is referenced from&nbsp;
						<a href={TierList.CREATOR_URL} className='text-secondary'>
							{TierList.CREATOR_NAME}
						</a>
						's Patch {TierList.VERSION}&nbsp;
						<a href={TierList.URL} className='text-secondary'>
							Tier List
						</a>
					</p>
				</AccordionDetails>
			</Accordion>

			{/* 
				Panel 5
				I want to recommend a feature
			*/}
			<Accordion
				expanded={expanded === 'panel5'}
				onChange={handleChange('panel5')}
				className={`${styles.accordionContainer} text-white-secondary`}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className='text-white-secondary' />}
					aria-controls='panel5bh-content'
					id='panel5bh-header'
					className={styles.accordionQuestionContainer}
				>
					<Typography className={classes.heading}>
						I want to recommend a feature
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={styles.accordionAnswerContainer}>
					<p>
						We would love to hear from you! Send us an email at&nbsp;
						<span className='text-secondary text-italic'>
							{Contact.EMAIL_ADDRESS}
						</span>
					</p>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
