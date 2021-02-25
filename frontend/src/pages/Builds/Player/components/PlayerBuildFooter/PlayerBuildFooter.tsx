import React from 'react';
import moment from 'moment';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// CSS
import styles from './playerbuildfooter.module.css';
// Types
type PlayerBuildFooterProps = {
	dateSubmitted: Date | undefined;
};

const PlayerBuildFooter = (props: PlayerBuildFooterProps) => {
	const { dateSubmitted } = props;

	return (
		<Box display='flex' className={styles.playerBuildFooterContainer}>
			<Box p={1} flexGrow={1}>
				<Typography variant='body2' className={styles.buildDateSubmittedText}>
					{moment(dateSubmitted).format('dddd, MMMM Do YYYY')}
				</Typography>
			</Box>
			<Box p={1}>
				<Typography variant='body2' className={styles.reportBuildText}>
					Report this build
				</Typography>
			</Box>
		</Box>
	);
};

export default PlayerBuildFooter;
