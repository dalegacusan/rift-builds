import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
// Components
// CSS
import styles from './builditem.module.css';
const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
// Types
type BuildItemProps = {
	itemId: string;
	itemName: string;
	reason: string;
};

const BuildItem = (props: BuildItemProps) => {
	const { itemId, itemName, reason } = props;
	const classes = useStyles();

	return (
		<Box display='flex' p={1}>
			<Box p={1} flexGrow={1}>
				<Avatar
					variant='square'
					className={`${classes.large} ${styles.itemAvatar}`}
				>
					<LazyLoadImage
						src={`/images/wildriftitems/${itemId}.png`}
						className={styles.itemImage}
						title={itemName}
						alt={itemName}
					/>
				</Avatar>
				{itemName}
			</Box>
			<Box p={1} className={styles.itemReasonContainer}>
				<span className={styles.itemReason}>{reason}</span>
			</Box>
		</Box>
	);
};

export default BuildItem;
