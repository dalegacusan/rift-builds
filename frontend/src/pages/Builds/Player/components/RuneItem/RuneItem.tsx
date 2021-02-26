import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
// Components
// CSS
import styles from './runeitem.module.css';
const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
// Types
type RuneItemProps = {
	runeId: string;
	runeName: string;
	reason: string;
};

const RuneItem = (props: RuneItemProps) => {
	const { runeId, runeName, reason } = props;
	const classes = useStyles();

	return (
		<Box display='flex' p={1}>
			<Box flexGrow={1} p={1}>
				<Avatar
					variant='square'
					className={`${classes.large} ${styles.runeAvatar}`}
				>
					<LazyLoadImage
						src={`/images/wildriftrunes/${runeId}.jpg`}
						className={styles.runeImage}
						title={runeName}
						alt={runeName}
					/>
				</Avatar>
				{runeName}
			</Box>
			{reason ? (
				<Box p={1} className={styles.runeReasonContainer}>
					<span className={styles.runeReason}>{reason}</span>
				</Box>
			) : null}
		</Box>
	);
};

export default RuneItem;
